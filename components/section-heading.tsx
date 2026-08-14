export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--gold)]">
        <span className="h-3.5 w-[3px] rounded-full bg-[var(--gold)]" />
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl sm:text-3xl mt-1.5">{title}</h2>
    </div>
  );
}
