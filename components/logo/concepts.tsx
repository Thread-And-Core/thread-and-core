type MarkProps = {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
};

/**
 * Concept 1 — The Knot Ampersand.
 * The "&" drawn as one continuous line tying a knot: the ampersand that
 * connects "Thread" and "Core" is itself the connection.
 */
export function KnotAmpersand({
  size = 32,
  stroke = "#D99A4E",
  strokeWidth = 2,
  className,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M25 27.6 C18.5 30.8 8.4 28.6 8 21.5 C7.6 15.2 15.5 13.5 17.5 8.5 C18.7 5.5 15.5 2.8 13.4 4.9 C11.3 7 13.2 11 17 15.5 C20.6 19.7 25 24.4 28.5 27.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Concept 2 — The Coil.
 * A single line enters from outside and coils inward to a still center:
 * thread meeting core.
 */
export function CoilCore({
  size = 32,
  stroke = "#D99A4E",
  strokeWidth = 2,
  className,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 16 H8 A10 10 0 1 1 28 16 A7 7 0 1 1 14 16 A4 4 0 1 1 22 16"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="18" cy="16" r="1.8" fill={stroke} />
    </svg>
  );
}

/**
 * Concept 3 — The Stitch.
 * A dashed thread passing through a circle, over and under: the stitch that
 * holds the system together.
 */
export function StitchMark({
  size = 32,
  stroke = "#D99A4E",
  strokeWidth = 2,
  className,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke={stroke}
        strokeOpacity={0.45}
        strokeWidth={strokeWidth * 0.75}
      />
      <path
        d="M0 19 C10 8 22 25 32 13"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="6.5 4"
      />
      <circle cx="16" cy="16" r="1.8" fill={stroke} />
    </svg>
  );
}

/** The nav/footer wordmark built on Concept 1. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-[6px] font-display text-[17px] font-bold tracking-[-0.01em] text-core-white ${className}`}
    >
      Thread
      <KnotAmpersand size={15} strokeWidth={2.6} className="translate-y-[1px]" />
      Core
    </span>
  );
}
