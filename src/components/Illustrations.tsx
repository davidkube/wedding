import { palette } from "@/content";

/**
 * A table set for two: hand-drawn shapes in olive, coral and mustard.
 * Swap for the real illustration when it exists.
 */
export function TableIllustration({ className }: { className?: string }) {
  const { olive, oliveLight, coral, mustard } = palette;
  return (
    <svg viewBox="0 0 320 240" className={className} role="img" aria-label="A table set for two">
      {/* table */}
      <path d="M40 150 Q160 138 280 150 L272 162 Q160 152 48 162 Z" fill={olive.hex} />
      <path d="M70 162 l-10 60 M250 162 l10 60" stroke={olive.hex} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* cloth edge */}
      <path d="M52 156 q108 -6 216 0" stroke={oliveLight.hex} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* plates */}
      <ellipse cx="110" cy="146" rx="30" ry="9" fill={palette.oat.hex} stroke={olive.hex} strokeWidth="2.5" />
      <ellipse cx="210" cy="146" rx="30" ry="9" fill={palette.oat.hex} stroke={olive.hex} strokeWidth="2.5" />
      {/* glasses */}
      <path d="M150 110 q-8 26 8 30 l0 8 M158 110 q8 26 -8 30" stroke={olive.hex} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M166 106 q-8 26 8 30 l0 10 M174 106 q8 26 -8 30" stroke={olive.hex} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M146 128 q10 6 20 0" fill={coral.hex} opacity="0.85" />
      <path d="M162 124 q10 6 20 0" fill={coral.hex} opacity="0.85" />
      {/* candle */}
      <rect x="156" y="70" width="8" height="34" rx="3" fill={mustard.hex} />
      <path d="M160 58 q-6 8 0 12 q6 -4 0 -12z" fill={coral.hex} />
      {/* branches */}
      <path d="M60 128 q20 -30 50 -22 M74 118 q6 -14 18 -12 M92 110 q4 -10 14 -8" stroke={olive.hex} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="66" cy="120" r="4" fill={mustard.hex} />
      <circle cx="88" cy="106" r="3.5" fill={coral.hex} />
      <path d="M260 128 q-20 -30 -50 -22 M246 118 q-6 -14 -18 -12 M228 110 q-4 -10 -14 -8" stroke={olive.hex} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="254" cy="120" r="4" fill={mustard.hex} />
      <circle cx="232" cy="106" r="3.5" fill={coral.hex} />
      {/* cutlery */}
      <path d="M78 146 h22 M232 146 h22" stroke={olive.hex} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/*
 * Hand-drawn botanicals for the hero (W04): loose shapes in olive, coral
 * and mustard. Each is a plain SVG so it can be placed and moved freely.
 */
export function LeafSprig({ className }: { className?: string }) {
  const { olive, oliveLight } = palette;
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden>
      <path d="M100 250 C 96 190, 92 130, 104 40" stroke={olive.hex} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M102 200 C 60 190, 40 160, 44 120 C 84 126, 104 160, 102 200 Z" fill={oliveLight.hex} />
      <path d="M100 150 C 140 146, 166 116, 160 78 C 122 84, 100 112, 100 150 Z" fill={olive.hex} />
      <path d="M103 104 C 68 100, 46 74, 50 40 C 84 46, 104 70, 103 104 Z" fill={oliveLight.hex} />
      <path d="M104 62 C 130 58, 148 36, 146 8 C 118 12, 104 34, 104 62 Z" fill={olive.hex} />
    </svg>
  );
}

export function CoralBloom({ className }: { className?: string }) {
  const { coral, mustard, olive } = palette;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        d="M100 28 C 124 10, 152 24, 148 52 C 176 52, 186 84, 164 100 C 186 120, 172 152, 144 148 C 146 178, 112 190, 98 166 C 80 190, 46 176, 52 146 C 22 148, 12 116, 36 100 C 14 82, 28 50, 56 54 C 52 26, 82 12, 100 28 Z"
        fill={coral.hex}
      />
      <circle cx="100" cy="100" r="22" fill={mustard.hex} />
      <circle cx="92" cy="94" r="3" fill={olive.hex} />
      <circle cx="108" cy="104" r="3" fill={olive.hex} />
      <circle cx="100" cy="112" r="2.5" fill={olive.hex} />
    </svg>
  );
}

export function MustardSpray({ className }: { className?: string }) {
  const { mustard, olive } = palette;
  return (
    <svg viewBox="0 0 160 220" className={className} aria-hidden>
      <path d="M80 214 C 82 160, 60 120, 34 80 M80 214 C 84 150, 96 110, 126 60 M80 214 C 78 150, 80 100, 84 30" stroke={olive.hex} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[
        [34, 80, 11],
        [126, 60, 12],
        [84, 30, 10],
        [52, 108, 7],
        [110, 92, 7],
        [70, 66, 6],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={mustard.hex} />
      ))}
    </svg>
  );
}

export function PaleFrond({ className }: { className?: string }) {
  const { oliveLight } = palette;
  return (
    <svg viewBox="0 0 240 120" className={className} aria-hidden>
      <path d="M6 100 C 60 96, 140 80, 234 20" stroke={oliveLight.hex} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[0.12, 0.26, 0.4, 0.54, 0.68, 0.82].map((t, i) => {
        const x = 6 + t * 228;
        const y = 100 - t * 80 - Math.sin(t * 3) * 6;
        const flip = i % 2 ? -1 : 1;
        return (
          <path
            key={t}
            d={`M${x} ${y} c ${18 * flip} ${-26}, ${44 * flip} ${-30}, ${52 * flip} ${-8} c ${-20} ${10}, ${-40} ${10}, ${-52 * flip} ${8} Z`}
            fill={oliveLight.hex}
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}
