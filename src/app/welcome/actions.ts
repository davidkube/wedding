"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { gate } from "@/content";
import { GATE_COOKIE, GATE_MAX_AGE, gateToken, passwordMatches } from "@/lib/gate";

export type GateState = { error?: string; attempts: number };

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
  redirect("/");
}
