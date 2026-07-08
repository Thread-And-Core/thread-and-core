type MarkProps = {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
};

/**
 * The trefoil thread: one continuous line tied into the most recognizable
 * knot form there is. Generated parametrically:
 * x = sin(t) + 2sin(2t), y = cos(t) − 2cos(2t).
 */
export const TREFOIL_PATH =
  "M24.0 17.1L26.3 17.2L28.5 17.5L30.6 18.0L32.7 18.7L34.6 19.6L36.4 20.6L38.0 21.8L39.4 23.1L40.6 24.5L41.5 25.9L42.2 27.4L42.7 28.9L42.9 30.4L42.8 31.8L42.5 33.1L41.9 34.3L41.1 35.5L40.1 36.4L38.9 37.2L37.6 37.7L36.0 38.1L34.4 38.2L32.7 38.1L30.9 37.8L29.1 37.2L27.3 36.4L25.5 35.4L23.8 34.2L22.1 32.7L20.6 31.1L19.2 29.3L18.0 27.5L17.0 25.4L16.1 23.4L15.5 21.3L15.1 19.1L14.9 17.0L14.9 15.0L15.1 13.0L15.5 11.1L16.1 9.4L16.9 7.9L17.8 6.5L18.9 5.4L20.1 4.5L21.3 3.8L22.7 3.4L24.0 3.3L25.3 3.4L26.7 3.8L27.9 4.5L29.1 5.4L30.2 6.5L31.1 7.9L31.9 9.4L32.5 11.1L32.9 13.0L33.1 15.0L33.1 17.0L32.9 19.1L32.5 21.3L31.9 23.4L31.0 25.4L30.0 27.4L28.8 29.3L27.4 31.1L25.9 32.7L24.2 34.2L22.5 35.4L20.7 36.4L18.9 37.2L17.1 37.8L15.3 38.1L13.6 38.2L12.0 38.1L10.4 37.7L9.1 37.2L7.9 36.4L6.9 35.5L6.1 34.4L5.5 33.1L5.2 31.8L5.1 30.4L5.3 28.9L5.8 27.4L6.5 25.9L7.4 24.5L8.6 23.1L10.0 21.8L11.6 20.6L13.4 19.6L15.3 18.7L17.4 18.0L19.5 17.5L21.7 17.2L24.0 17.1Z";

/**
 * PRIMARY MARK — The Knot Core.
 * The thread (line) tied into a knot (connection) around the core (dot).
 * The mark alone says the name: Thread & Core.
 */
export function KnotCore({
  size = 32,
  stroke = "#D99A4E",
  strokeWidth = 2,
  className,
  core = "#F0C987",
}: MarkProps & { core?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(0 2.9)">
        <path
          d={TREFOIL_PATH}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <circle cx="24" cy="24.6" r="3.1" fill={core} />
      </g>
    </svg>
  );
}

/** Concept 1 (superseded) — the knot ampersand. */
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

/** Concept 2 (superseded) — the coil. */
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

/** Concept 3 (superseded) — the stitch. */
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

/** The nav/footer wordmark built on the Knot Core mark. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-[12px] ${className}`}
    >
      <KnotCore size={56} strokeWidth={2.4} />
      <span className="flex flex-col">
        <span className="font-display text-[19px] leading-none font-bold tracking-[-0.01em] text-core-white">
          Thread <span className="text-thread-500">&amp;</span> Core
        </span>
        <span className="mt-[5px] font-mono text-[9px] leading-none tracking-[0.52em] text-fg-secondary uppercase">
          Systems
        </span>
      </span>
    </span>
  );
}
