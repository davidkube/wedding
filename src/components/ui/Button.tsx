"use client";

import { motion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-coral text-oat hover:bg-[#d05f45]",
  secondary: "border-[1.5px] border-olive text-olive hover:bg-olive hover:text-oat",
  ink: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-oat rounded-none",
  text: "text-coral px-0 h-auto hover:underline underline-offset-4",
} as const;

type Base = {
  variant?: keyof typeof variants;
  className?: string;
};

const base =
  "mono-caps inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:opacity-60";

export function Button({ variant = "primary", className, ...rest }: Base & ComponentPropsWithoutRef<"button">) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    />
  );
}

export function LinkButton({ variant = "primary", className, ...rest }: Base & ComponentPropsWithoutRef<"a">) {
  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
      {...(rest as React.ComponentProps<typeof motion.a>)}
    />
  );
}
