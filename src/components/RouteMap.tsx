"use client";

import { motion } from "motion/react";
import { travel, venue } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Illustrated route from Cape Town to the farm, drawn like a page torn from
 * a road atlas: Atlantic and False Bay to the left, the N1 in coral out past
 * Klapmuts, a pin on Zonnevanger. The whole card is the link to Google Maps.
 */
export function RouteMap({ className }: { className?: string }) {
  const { route, mapCta } = travel;
  return (
    <motion.a
      href={mapCta.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Route from ${route.from} to ${venue.place}, about ${route.duration} — ${mapCta.label}`}
      className={cn(
        "block cursor-pointer border border-ink/25 bg-oat bg-cover bg-center shadow-[0_1px_0_rgba(38,43,33,0.1),0_18px_36px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
      style={{ backgroundImage: "url(/images/paper-texture.jpg)" }}
      initial={{ rotate: -1.5 }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <svg viewBox="0 0 400 300" aria-hidden className="block h-auto w-full mix-blend-multiply">
        {/* land */}
        <rect width="400" height="268" fill="var(--color-olive-pale-2)" />
        {/* Atlantic and Table Bay */}
        <path d="M0 0 H118 C104 52 92 104 118 152 C134 182 108 214 96 240 L86 268 H0 Z" fill="var(--color-rose-light)" />
        {/* False Bay */}
        <path d="M150 268 C168 236 236 232 276 268 Z" fill="var(--color-rose-light)" />
        <g fill="none" stroke="var(--color-rose)" strokeWidth="1.2" strokeLinecap="round">
          <path d="M22 96 q6 -5 12 0 t12 0" />
          <path d="M40 150 q6 -5 12 0 t12 0" />
          <path d="M18 206 q6 -5 12 0 t12 0" />
          <path d="M198 258 q6 -5 12 0 t12 0" />
        </g>

        {/* mountains: Table Mountain, the Wellington ranges, Jonkershoek */}
        <g fill="none" stroke="var(--color-olive-light)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M78 236 L92 214 H112 L124 236" />
          <path d="M356 30 l12 -16 l10 14 l12 -20 l10 16" />
          <path d="M372 70 l10 -14 l8 10 l12 -18" />
          <path d="M318 262 l14 -22 l10 16 l14 -26 l14 22" />
          <path d="M360 236 l12 -18 l10 12 l12 -20" />
        </g>
        {/* vineyard rows outside Paarl */}
        <g stroke="var(--color-olive-light)" strokeWidth="1" transform="rotate(-18 322 138)">
          <path d="M300 126 h44 M300 132 h44 M300 138 h44 M300 144 h44 M300 150 h44" />
        </g>

        {/* minor roads: N7, N2, R44 */}
        <g fill="none" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="1.1">
          <path d="M128 168 C132 116 150 60 166 0" />
          <path d="M118 214 C180 224 244 240 302 234" />
          <path d="M300 268 L330 108 L344 46" />
          <path d="M286 122 C300 150 300 190 298 232" />
        </g>
        <g className="font-mono" fill="var(--color-stone)" fontSize="6">
          <text x="150" y="44">N7</text>
          <text x="240" y="248">N2</text>
        </g>

        {/* the slower way round via Paarl */}
        <path
          d="M284 120 C306 118 322 114 330 106 C328 88 324 70 320 58"
          fill="none"
          stroke="var(--color-stone)"
          strokeWidth="2"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
        {/* the route: Century City → N1 → Klapmuts → the farm */}
        <path
          d="M136 186 C160 178 190 170 226 154 C250 144 268 130 284 120 C294 100 304 80 318 60"
          fill="none"
          stroke="var(--color-coral)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="206" y="146" width="20" height="13" rx="2" fill="var(--color-olive)" />
        <text x="216" y="155.5" className="font-mono" fill="var(--color-oat)" fontSize="7.5" textAnchor="middle" fontWeight="600">
          N1
        </text>

        {/* callout */}
        <g transform="translate(178 86)">
          <path d="M0 0 H80 V28 H0 Z M80 10 l7 4 l-7 4" fill="var(--color-oat)" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1" strokeLinejoin="round" />
          <text x="8" y="12" className="font-mono" fill="var(--color-ink)" fontSize="8" fontWeight="600">
            {route.duration} · {route.distance}
          </text>
          <text x="8" y="22" className="font-mono" fill="var(--color-stone)" fontSize="6">
            from {route.from}
          </text>
        </g>

        {/* markers */}
        <polygon points="110,198 112.5,204 119,204.5 114,208.5 115.5,215 110,211.5 104.5,215 106,208.5 101,204.5 107.5,204" fill="var(--color-mustard)" />
        <circle cx="136" cy="186" r="4" fill="var(--color-oat)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <circle cx="284" cy="120" r="2.8" fill="var(--color-coral)" stroke="var(--color-oat)" strokeWidth="1" />
        <circle cx="298" cy="178" r="2.5" fill="var(--color-ink)" />
        <circle cx="330" cy="106" r="2.5" fill="var(--color-ink)" />
        <circle cx="344" cy="46" r="2.5" fill="var(--color-ink)" />
        <g transform="translate(318 60)">
          <path d="M0 0 C-2 -6 -11 -12 -11 -20 A11 11 0 1 1 11 -20 C11 -12 2 -6 0 0 Z" fill="var(--color-coral)" />
          <circle cy="-20" r="3.5" fill="var(--color-oat)" />
        </g>

        {/* labels */}
        <g className="font-serif" fill="var(--color-ink)" fontStyle="italic">
          <text x="58" y="196" fontSize="11">Cape Town</text>
          <text x="304" y="182" fontSize="9.5">Stellenbosch</text>
          <text x="336" y="104" fontSize="11">Paarl</text>
          <text x="350" y="48" fontSize="9.5">Wellington</text>
          <text x="303" y="37" fontSize="10.5" textAnchor="end" fill="var(--color-wine)">{venue.name}</text>
          <text x="14" y="60" fontSize="8" fill="var(--color-stone)">Atlantic</text>
          <text x="14" y="70" fontSize="8" fill="var(--color-stone)">Ocean</text>
          <text x="196" y="262" fontSize="7" fill="var(--color-stone)">False Bay</text>
        </g>
        <g className="font-mono" fill="var(--color-stone)" fontSize="6">
          <text x="130" y="177" textAnchor="end" fill="var(--color-ink)">Century City</text>
          <text x="280" y="132" textAnchor="end">Klapmuts</text>
          <text x="76" y="248" fontSize="5.5">Table Mountain</text>
        </g>

        {/* compass */}
        <g transform="translate(374 244)">
          <circle r="13" fill="var(--color-oat)" stroke="var(--color-ink)" strokeOpacity="0.35" />
          <path d="M0 -9 L4 5 L0 2 L-4 5 Z" fill="var(--color-coral)" />
          <text y="-16" className="font-mono" fill="var(--color-ink)" fontSize="7" textAnchor="middle" fontWeight="600">
            N
          </text>
        </g>

        {/* footer strip: the link's label */}
        <rect y="268" width="400" height="32" fill="var(--color-oat)" />
        <line x1="0" y1="268.5" x2="400" y2="268.5" stroke="var(--color-ink)" strokeOpacity="0.25" />
        <text x="200" y="288" className="font-mono" fill="var(--color-coral)" fontSize="8" letterSpacing="1.4" textAnchor="middle">
          {mapCta.label.toUpperCase()} ↗
        </text>
      </svg>
    </motion.a>
  );
}
