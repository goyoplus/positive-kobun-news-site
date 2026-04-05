import { AlertCircle, Download, LoaderCircle, Trash2 } from "lucide-react";

import {
  formatBytes,
  formatSignedBytes,
  normalizeOutputFileName,
} from "@/lib/file-utils";
import type { ImageItem } from "@/lib/types";

type ProcessedImageCardProps = {
  item: ImageItem;
  disabled: boolean;
  onFileNameChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
};

function getStatusLabel(item: ImageItem) {
  switch (item.status) {
    case "processing":
      return "変換中";
    case "done":
      return "変換完了";
    case "error":
      return "エラー";
    default:
      return "変換待ち";
  }
}

function getStatusTone(item: ImageItem) {
  switch (item.status) {
    case "processing":
      return "bg-amber-50 text-amber-700";
    case "done":
      return "bg-accent-100/90 text-accent-800";
    case "error":
      return "bg-rose-50 text-rose-700";
    default:
      return "bg-accent-100/75 text-accent-800";
  }
}

export function ProcessedImageCard({
  item,
  disabled,
  onFileNameChange,
  onRemove,
}: ProcessedImageCardProps) {
  const deltaBytes =
    typeof item.processedBytes === "number"
      ? item.processedBytes - item.originalBytes
      : 0;
  const downloadName = normalizeOutputFileName(item.fileName, item.originalName);

  return (
    <article className="panel-muted overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-accent-100/70 px-5 py-4">
        <div>
          <div
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusTone(item)}`}
          >
            {getStatusLabel(item)}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-950">{item.originalName}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {item.originalWidth} × {item.originalHeight} / {formatBytes(item.originalBytes)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          disabled={disabled}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-accent-200 bg-white/96 text-accent-800 transition hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:text-slate-300"
          aria-label="画像を削除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4 px-5 py-5 md:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-medium tracking-[0.16em] text-slate-400 uppercase">Before</div>
          <div className="soft-checker overflow-hidden rounded-[24px] border border-accent-200/80 bg-white/96 p-3">
            <div className="relative aspect-square overflow-hidden rounded-[18px] bg-white">
              <img
                src={item.sourceUrl}
                alt={item.originalName}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-medium tracking-[0.16em] text-slate-400 uppercase">After</div>
          <div className="soft-checker overflow-hidden rounded-[24px] border border-accent-200/80 bg-white/96 p-3">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[18px] bg-white">
              {item.processedUrl ? (
                <img
                  src={item.processedUrl}
                  alt={`${item.originalName} を整形した画像`}
                  className="h-full w-full object-contain"
                />
              ) : item.status === "processing" ? (
                <div className="flex flex-col items-center gap-3 text-sm text-slate-500">
                  <LoaderCircle className="h-6 w-6 animate-spin text-accent-600" />
                  整形しています…
                </div>
              ) : (
                <div className="px-6 text-center text-sm leading-7 text-slate-400">
                  一括変換すると、ここに JPEG 化後のプレビューが表示されます。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-accent-100/70 px-5 py-5">
        <label className="text-sm font-medium text-slate-700" htmlFor={`filename-${item.id}`}>
          出力ファイル名
        </label>
        <input
          id={`filename-${item.id}`}
          value={item.fileName}
          onChange={(event) => onFileNameChange(item.id, event.target.value)}
          placeholder="ABC123_01.jpg"
          className="soft-input mt-2"
          disabled={disabled}
        />

        {item.errorMessage ? (
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{item.errorMessage}</span>
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-accent-100/90 px-3 py-1">出力形式: JPEG</span>
            {typeof item.outputDimension === "number" ? (
              <span className="rounded-full bg-accent-100/80 px-3 py-1">
                出力サイズ: {item.outputDimension}px
              </span>
            ) : null}
            {typeof item.processedBytes === "number" ? (
              <>
                <span className="rounded-full bg-accent-100/80 px-3 py-1">
                  変換後: {formatBytes(item.processedBytes)}
                </span>
                <span className="rounded-full bg-accent-100/80 px-3 py-1">
                  差分: {formatSignedBytes(deltaBytes)}
                </span>
              </>
            ) : null}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            {item.processedUrl
              ? "個別ダウンロードもできます。"
              : "ファイル名は先に整えておけます。"}
          </p>

          {item.processedUrl ? (
            <a
              href={item.processedUrl}
              download={downloadName}
              className="secondary-button"
            >
              <Download className="mr-2 h-4 w-4" />
              個別ダウンロード
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
