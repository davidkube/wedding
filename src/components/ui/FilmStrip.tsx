import { hero } from "@/content";
import { cn } from "@/lib/cn";

/** The home-movie loop with film sprockets down both edges. Size it from outside. */
export function FilmStrip({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[3/4] w-full overflow-hidden border border-ink/15", className)}>
      <video className="absolute inset-0 h-full w-full object-cover" src={hero.sideVideo.src} aria-label={hero.sideVideo.alt} autoPlay muted loop playsInline />
      <div aria-hidden className="sprockets-v absolute inset-y-0 left-0 w-2.5 text-olive-black/80" />
      <div aria-hidden className="sprockets-v absolute inset-y-0 right-0 w-2.5 text-olive-black/80" />
    </div>
  );
}
