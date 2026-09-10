import Image from "next/image";
import { cn } from "@/lib/cn";

type ImageSpec = { src: string; alt: string; objectPosition?: string };

/** Striped block with a mono label, standing in for a photo that does not exist yet. */
export function Placeholder({
  label,
  tone = "rose",
  className,
}: {
  label: string;
  tone?: "rose" | "olive" | "pale" | "dark";
  className?: string;
}) {
  const tones = {
    rose: "stripes-rose text-ink",
    olive: "stripes-olive text-ink",
    pale: "stripes-pale text-ink",
    dark: "stripes-dark text-oat-dim",
  };
  return (
    <div className={cn("grid place-items-center p-3 text-center font-mono text-[10.5px] whitespace-pre-line", tones[tone], className)}>
      {label}
    </div>
  );
}

/**
 * Photo that fills its box, or a placeholder when no image is given.
 * Give the wrapper an aspect ratio; this fills it.
 */
export function Photo({
  image,
  placeholder,
  tone,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: {
  image?: ImageSpec;
  placeholder?: string;
  tone?: "rose" | "olive" | "pale" | "dark";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!image) return <Placeholder label={placeholder ?? "photo"} tone={tone} className={cn("h-full w-full", className)} />;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      style={{ objectPosition: image.objectPosition }}
    />
  );
}
