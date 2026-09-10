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
