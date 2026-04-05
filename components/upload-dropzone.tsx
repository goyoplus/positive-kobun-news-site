import { RefObject } from "react";
import { FileImage, Images, UploadCloud } from "lucide-react";

type UploadDropzoneProps = {
  dragging: boolean;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onFilesSelected: (files: FileList | File[]) => void;
  onDraggingChange: (dragging: boolean) => void;
};

export function UploadDropzone({
  dragging,
  disabled,
  inputRef,
  onFilesSelected,
  onDraggingChange,
}: UploadDropzoneProps) {
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) {
          onDraggingChange(true);
        }
      }}
      onDragLeave={() => onDraggingChange(false)}
      onDrop={(event) => {
        event.preventDefault();
        onDraggingChange(false);
        if (disabled) {
          return;
        }

        if (event.dataTransfer.files?.length) {
          onFilesSelected(event.dataTransfer.files);
        }
      }}
      className={`rounded-[28px] border-2 border-dashed p-7 transition sm:p-8 ${
        dragging
          ? "border-accent-600 bg-accent-100/80"
          : "border-accent-300 bg-accent-100/40"
      }`}
    >
      <div className="flex flex-col items-start gap-5">
        <div className="inline-flex rounded-3xl bg-white/95 p-4 shadow-soft ring-1 ring-accent-200/70">
          <UploadCloud className="h-7 w-7 text-accent-800" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-950">商品画像をまとめてアップロード</h3>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            `jpg / jpeg / png / webp` に対応。ドラッグ&ドロップでも、まとめて選択でも追加できます。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="soft-button"
          >
            ファイルを選ぶ
          </button>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-accent-200 bg-white/95 px-4 py-3 text-sm text-accent-900">
            <FileImage className="h-4 w-4" />
            JPEG出力
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-accent-200 bg-white/95 px-4 py-3 text-sm text-accent-900">
            <Images className="h-4 w-4" />
            複数枚まとめて処理
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          multiple
          onChange={(event) => {
            if (event.target.files?.length) {
              onFilesSelected(event.target.files);
              event.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
