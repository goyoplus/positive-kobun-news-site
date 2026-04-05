import { Archive, ImageIcon, Scale, Sparkles } from "lucide-react";

import { formatBytes, formatPercentRatio } from "@/lib/file-utils";

type StatsStripProps = {
  totalCount: number;
  processedCount: number;
  originalBytes: number;
  processedBytes: number;
};

export function StatsStrip({
  totalCount,
  processedCount,
  originalBytes,
  processedBytes,
}: StatsStripProps) {
  const cards = [
    {
      label: "追加済み画像",
      value: `${totalCount}枚`,
      icon: ImageIcon,
    },
    {
      label: "変換完了",
      value: `${processedCount}枚`,
      icon: Sparkles,
    },
    {
      label: "合計サイズ",
      value:
        processedCount > 0
          ? `${formatBytes(originalBytes)} → ${formatBytes(processedBytes)}`
          : formatBytes(originalBytes),
      icon: Archive,
    },
    {
      label: "サイズ差分",
      value:
        processedCount > 0
          ? `${formatPercentRatio(originalBytes, processedBytes)}`
          : "変換後に表示",
      icon: Scale,
    },
  ];

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="panel-muted px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-accent-100/90 p-3 text-accent-800">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-medium tracking-[0.16em] text-accent-800 uppercase">{label}</div>
              <div className="mt-1 text-lg font-semibold text-slate-950">{value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
