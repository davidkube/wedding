import { cn } from "@/lib/cn";

/** Lace trim tiled along the top edge of a band; hangs mostly above its container's top. */
export function Lace({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-x-[clamp(40px,7vw,90px)] top-0 z-20 h-[clamp(72px,9vw,120px)] -translate-y-[62%]",
        className,
      )}
      style={{
        backgroundImage: "url(/images/lace.webp)",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "left top",
      }}
    />
  );
}
