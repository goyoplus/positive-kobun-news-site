import { Check, Package2 } from "lucide-react";

import { MALL_PRESETS } from "@/lib/mall-presets";
import type { MallPresetId } from "@/lib/types";

type PresetSelectorProps = {
  value: MallPresetId;
  onChange: (value: MallPresetId) => void;
};

export function PresetSelector({ value, onChange }: PresetSelectorProps) {
  return (
    <div className="panel-muted p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-accent-100/85 p-3 text-accent-800">
          <Package2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-950">モール別プリセット</h3>
          <p className="mt-1 text-sm text-slate-500">まずは UI から使いやすい切替に寄せています。</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {MALL_PRESETS.map((preset) => {
          const isSelected = preset.id === value;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              className={`rounded-[24px] border px-4 py-4 text-left transition ${
                isSelected
                  ? "border-accent-400 bg-accent-100/90 shadow-soft"
                  : "border-accent-200 bg-white/92 hover:border-accent-300 hover:bg-accent-50/80"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-950">{preset.name}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{preset.description}</p>
                </div>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    isSelected ? "bg-accent-700 text-white" : "bg-accent-100 text-accent-400"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-accent-200/70 bg-white/95 px-3 py-1">{preset.dimension}px</span>
                <span className="rounded-full border border-accent-300/70 bg-accent-100/90 px-3 py-1">JPEG</span>
                <span className="rounded-full border border-accent-200/70 bg-white/95 px-3 py-1">3MB以下</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
