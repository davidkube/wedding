"use server";

import { cookies } from "next/headers";
import { gate } from "@/content";
import { GATE_COOKIE, GATE_MAX_AGE, gateToken, passwordMatches } from "@/lib/gate";

export type GateState = { error?: string; attempts: number; ok?: boolean };

/**
 * Checks the word and sets the guest cookie. The form does a full page load
 * to `/` on success rather than a router redirect, so the site starts at the
 * top with fresh scroll state.
 */
export async function unlock(prev: GateState, formData: FormData): Promise<GateState> {
  const attempt = String(formData.get("password") ?? "");
  if (!passwordMatches(attempt)) return { error: gate.error, attempts: prev.attempts + 1 };

  const store = await cookies();
  store.set(GATE_COOKIE, await gateToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: GATE_MAX_AGE,
  });
  return { attempts: prev.attempts, ok: true };
}
