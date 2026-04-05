type HaikuBlockProps = {
  lines: [string, string, string];
  compact?: boolean;
};

export function HaikuBlock({ lines, compact = false }: HaikuBlockProps) {
  return (
    <div
      className={
        compact
          ? "rounded-[24px] border border-gold-100 bg-gold-50/70 p-4"
          : "rounded-[28px] border border-gold-100 bg-[linear-gradient(135deg,rgba(246,241,225,0.96),rgba(255,252,247,0.96))] p-6"
      }
    >
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold-400">俳句要約</p>
      <div className="space-y-1 font-serif text-lg leading-relaxed text-ink sm:text-xl">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
