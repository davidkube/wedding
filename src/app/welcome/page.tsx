import type { Metadata } from "next";
import { couple, gate } from "@/content";
import { Lace } from "@/components/ui/Lace";
import { GateForm } from "./GateForm";

export const metadata: Metadata = {
  title: `${couple.names} · ${gate.eyebrow}`,
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return (
    <main className="wine-depth relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[clamp(16px,4vw,64px)] py-[clamp(96px,14vw,160px)] text-oat">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 top-[clamp(64px,9vw,110px)]">
        <Lace />
      </div>
      <GateForm />
    </main>
  );
}
