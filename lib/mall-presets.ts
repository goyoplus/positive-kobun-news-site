import type { MallPreset, MallPresetId } from "@/lib/types";

export const MALL_PRESETS: MallPreset[] = [
  {
    id: "amazon",
    name: "Amazon用",
    shortLabel: "Amazon",
    description: "白背景寄りで、商品が大きめに見える整い方。",
    detail: "1:1 正方形 / 白背景寄り / 大きめ表示 / 十分な画質",
    dimension: 1800,
    maxBytes: 3 * 1024 * 1024,
    paddingRatio: 0.08,
    targetQuality: 0.9,
    background: "#fbfbf8",
  },
  {
    id: "rakuten",
    name: "楽天用",
    shortLabel: "楽天",
    description: "見栄えと余白のバランスを取りやすい設定。",
    detail: "1:1 正方形 / バランス重視 / 見栄え寄り / 柔らかい余白",
    dimension: 1600,
    maxBytes: 3 * 1024 * 1024,
    paddingRatio: 0.12,
    targetQuality: 0.88,
    background: "#fcfbf7",
  },
  {
    id: "yahoo",
    name: "ヤフー用",
    shortLabel: "ヤフー",
    description: "軽めの出力で一括変換しやすさを優先。",
    detail: "1:1 正方形 / 軽め / 一括変換しやすい / 控えめ余白",
    dimension: 1400,
    maxBytes: 3 * 1024 * 1024,
    paddingRatio: 0.15,
    targetQuality: 0.82,
    background: "#fafaf7",
  },
];

export const DEFAULT_PRESET_ID: MallPresetId = "amazon";

export function getMallPreset(id: MallPresetId) {
  return MALL_PRESETS.find((preset) => preset.id === id) ?? MALL_PRESETS[0];
}
