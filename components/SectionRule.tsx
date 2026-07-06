type Props = {
  index: string;
  label: string;
  className?: string;
};

/**
 * Section boundary marker: a numbered stitch. Copper index + label, a short
 * copper tick, then a hairline running the rest of the container width.
 * Every major section opens with one so a new chapter is unmistakable.
 */
export default function SectionRule({ index, label, className = "" }: Props) {
  return (
    <div className={`mb-12 flex items-center gap-4 ${className}`}>
      <span className="font-mono text-[11px] tracking-[0.14em] text-thread-500">
        {index}
      </span>
      <span className="eyebrow whitespace-nowrap">{label}</span>
      <span className="ml-2 h-px w-14 shrink-0 bg-thread-500/60" />
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}
