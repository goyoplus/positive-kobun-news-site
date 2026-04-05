"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import JSZip from "jszip";
import {
  Eraser,
  FileOutput,
  FolderDown,
  Info,
  Sparkles,
} from "lucide-react";

import { PresetSelector } from "@/components/preset-selector";
import { ProcessedImageCard } from "@/components/processed-image-card";
import { StatsStrip } from "@/components/stats-strip";
import { UploadDropzone } from "@/components/upload-dropzone";
import {
  buildSequentialFileName,
  downloadBlob,
  formatBytes,
  isSupportedImageFile,
  normalizeOutputFileName,
  sanitizeBaseName,
} from "@/lib/file-utils";
import { processImageFile, readImageDimensions } from "@/lib/image-processing";
import { DEFAULT_PRESET_ID, getMallPreset } from "@/lib/mall-presets";
import type { ImageItem, MallPresetId } from "@/lib/types";

function clearProcessedState(item: ImageItem): ImageItem {
  return {
    ...item,
    status: "idle",
    errorMessage: undefined,
    processedBlob: undefined,
    processedBytes: undefined,
    processedUrl: undefined,
    outputDimension: undefined,
    qualityUsed: undefined,
    processedPresetId: undefined,
  };
}

export function ImageWorkspace() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [presetId, setPresetId] = useState<MallPresetId>(DEFAULT_PRESET_ID);
  const [modelCode, setModelCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "画像はブラウザ内だけで処理されます。",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();

  const activePreset = getMallPreset(presetId);
  const processedItems = items.filter((item) => item.status === "done" && item.processedBlob);
  const totalOriginalBytes = items.reduce((sum, item) => sum + item.originalBytes, 0);
  const totalProcessedBytes = processedItems.reduce(
    (sum, item) => sum + (item.processedBytes ?? 0),
    0,
  );
  const isBusy = isProcessing || isUploading;
  const hasItems = items.length > 0;

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const trackObjectUrl = (url: string) => {
    objectUrlsRef.current.push(url);
    return url;
  };

  const syncDefaultFileNames = (nextModelCode: string) => {
    setItems((previous) =>
      previous.map((item, index) =>
        item.nameEdited
          ? item
          : {
              ...item,
              fileName: buildSequentialFileName({
                modelCode: nextModelCode,
                index,
                originalName: item.originalName,
              }),
            },
      ),
    );
  };

  const addFiles = async (fileList: FileList | File[]) => {
    const candidates = Array.from(fileList);
    const supportedFiles = candidates.filter(isSupportedImageFile);
    const skippedCount = candidates.length - supportedFiles.length;

    if (!supportedFiles.length) {
      setErrorMessage("`jpg / jpeg / png / webp` の画像を追加してください。");
      return;
    }

    const startIndex = items.length;
    const settled = await Promise.allSettled(
      supportedFiles.map(async (file, index) => {
        const sourceUrl = trackObjectUrl(URL.createObjectURL(file));
        const dimensions = await readImageDimensions(sourceUrl);

        return {
          id: crypto.randomUUID(),
          file,
          originalName: file.name,
          sourceUrl,
          originalWidth: dimensions.width,
          originalHeight: dimensions.height,
          originalBytes: file.size,
          fileName: buildSequentialFileName({
            modelCode,
            index: startIndex + index,
            originalName: file.name,
          }),
          nameEdited: false,
          status: "idle",
        } satisfies ImageItem;
      }),
    );

    const nextItems = settled.flatMap((result) =>
      result.status === "fulfilled" ? [result.value] : [],
    );
    const failedCount = settled.length - nextItems.length;

    startUploadTransition(() => {
      setItems((previous) => [...previous, ...nextItems]);
    });

    if (failedCount > 0) {
      setErrorMessage(
        "一部の画像を読み込めませんでした。壊れたファイルが含まれていないか確認してください。",
      );
    } else if (skippedCount > 0) {
      setErrorMessage("未対応形式のファイルはスキップしました。");
    } else {
      setErrorMessage("");
    }

    setStatusMessage(
      `${nextItems.length}枚追加しました。プリセットと型番を確認して一括変換できます。`,
    );
  };

  const handlePresetChange = (nextPresetId: MallPresetId) => {
    if (nextPresetId === presetId) {
      return;
    }

    setPresetId(nextPresetId);
    setItems((previous) => previous.map(clearProcessedState));
    setStatusMessage(
      "プリセットを切り替えました。新しい設定で整形するには、もう一度一括変換してください。",
    );
    setErrorMessage("");
  };

  const handleModelCodeChange = (value: string) => {
    setModelCode(value);
    syncDefaultFileNames(value);
  };

  const handleFileNameChange = (id: string, value: string) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              fileName: value,
              nameEdited: true,
            }
          : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
    setStatusMessage("画像を一覧から外しました。");
  };

  const handleClear = () => {
    setItems([]);
    setErrorMessage("");
    setStatusMessage("画像一覧をクリアしました。");
  };

  const handleProcessAll = async () => {
    if (!items.length || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    let completed = 0;
    let errored = 0;

    try {
      for (const [index, currentItem] of items.entries()) {
        setStatusMessage(`${index + 1}/${items.length}枚目を整形しています…`);
        setItems((previous) =>
          previous.map((item) =>
            item.id === currentItem.id
              ? {
                  ...item,
                  status: "processing",
                  errorMessage: undefined,
                }
              : item,
          ),
        );

        try {
          const result = await processImageFile(currentItem.file, activePreset);
          const processedUrl = trackObjectUrl(URL.createObjectURL(result.blob));

          setItems((previous) =>
            previous.map((item, itemIndex) =>
              item.id === currentItem.id
                ? {
                    ...item,
                    status: "done",
                    processedBlob: result.blob,
                    processedBytes: result.blob.size,
                    processedUrl,
                    outputDimension: result.outputDimension,
                    qualityUsed: result.quality,
                    processedPresetId: activePreset.id,
                    fileName: item.nameEdited
                      ? item.fileName
                      : buildSequentialFileName({
                          modelCode,
                          index: itemIndex,
                          originalName: item.originalName,
                        }),
                  }
                : item,
            ),
          );
          completed += 1;
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "画像処理に失敗しました。別の画像で再度お試しください。";

          setItems((previous) =>
            previous.map((item) =>
              item.id === currentItem.id
                ? {
                    ...item,
                    status: "error",
                    errorMessage: message,
                    processedBlob: undefined,
                    processedBytes: undefined,
                    processedUrl: undefined,
                    outputDimension: undefined,
                    qualityUsed: undefined,
                    processedPresetId: undefined,
                  }
                : item,
            ),
          );
          errored += 1;
        }
      }

      setStatusMessage(
        errored > 0
          ? `${completed}枚完了、${errored}枚でエラーがありました。`
          : `${completed}枚の整形が完了しました。`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadZip = async () => {
    if (!processedItems.length) {
      return;
    }

    setStatusMessage("ZIP を生成しています…");

    const zip = new JSZip();
    processedItems.forEach((item) => {
      zip.file(
        normalizeOutputFileName(item.fileName, item.originalName),
        item.processedBlob as Blob,
      );
    });

    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    const zipBaseName = sanitizeBaseName(modelCode) || "ec-images";

    downloadBlob(blob, `${zipBaseName}_${presetId}.zip`);
    setStatusMessage("ZIP をダウンロードしました。");
  };

  return (
    <section id="workspace" className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="text-sm font-medium tracking-[0.18em] text-accent-700 uppercase">
            Workspace
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
            EC画像一括整形ワークスペース
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            まずは確実に動く Canvas ベースの MVP として、ブラウザ側で JPEG 化・正方形化・圧縮・余白調整・型番リネームまで完結させています。
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="panel p-4 sm:p-5">
            <UploadDropzone
              dragging={dragging}
              disabled={isBusy}
              inputRef={inputRef}
              onDraggingChange={setDragging}
              onFilesSelected={addFiles}
            />

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="panel-muted p-5">
                <label className="text-sm font-medium text-slate-700" htmlFor="model-code">
                  型番ベース
                </label>
                <input
                  id="model-code"
                  value={modelCode}
                  onChange={(event) => handleModelCodeChange(event.target.value)}
                  placeholder="例: ABC123"
                  className="soft-input mt-2"
                  disabled={isBusy}
                />
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  未編集のファイル名は、型番ベースを入れると
                  <span className="font-medium text-slate-700"> `ABC123_01.jpg` </span>
                  の形式へ自動で揃えます。
                </p>
              </div>

              <div className="panel-muted p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-accent-100/90 p-3 text-accent-800">
                    <FileOutput className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">出力設定</h3>
                    <p className="mt-1 text-sm text-slate-500">{activePreset.detail}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                    <div className="text-slate-500">形式</div>
                    <div className="mt-1 font-medium text-slate-900">JPEG</div>
                  </div>
                  <div className="rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                    <div className="text-slate-500">上限</div>
                    <div className="mt-1 font-medium text-slate-900">3MB以下</div>
                  </div>
                  <div className="rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                    <div className="text-slate-500">サイズ</div>
                    <div className="mt-1 font-medium text-slate-900">{activePreset.dimension}px</div>
                  </div>
                  <div className="rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                    <div className="text-slate-500">余白</div>
                    <div className="mt-1 font-medium text-slate-900">
                      {Math.round(activePreset.paddingRatio * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleProcessAll}
                disabled={!items.length || isBusy}
                className="soft-button"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                一括変換する
              </button>
              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={!processedItems.length || isBusy}
                className="secondary-button"
              >
                <FolderDown className="mr-2 h-4 w-4" />
                ZIPで一括ダウンロード
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!items.length || isBusy}
                className="secondary-button"
              >
                <Eraser className="mr-2 h-4 w-4" />
                一覧をクリア
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2 rounded-2xl border border-accent-200/70 bg-accent-100/85 px-4 py-3 text-sm text-accent-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              {errorMessage ? (
                <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {errorMessage}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <PresetSelector value={presetId} onChange={handlePresetChange} />

            <div className="panel-muted p-5">
              <h3 className="text-lg font-semibold text-slate-950">いまの設定</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                  <span>選択中プリセット</span>
                  <span className="font-medium text-slate-900">{activePreset.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                  <span>型番ベース</span>
                  <span className="font-medium text-slate-900">{modelCode || "未入力"}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                  <span>処理対象</span>
                  <span className="font-medium text-slate-900">{items.length}枚</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-accent-200/70 bg-accent-100/80 px-4 py-3">
                  <span>合計サイズ</span>
                  <span className="font-medium text-slate-900">{formatBytes(totalOriginalBytes)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {hasItems ? (
          <>
            <StatsStrip
              totalCount={items.length}
              processedCount={processedItems.length}
              originalBytes={totalOriginalBytes}
              processedBytes={totalProcessedBytes}
            />

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {items.map((item) => (
                <ProcessedImageCard
                  key={item.id}
                  item={item}
                  disabled={isBusy}
                  onFileNameChange={handleFileNameChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="panel-muted mt-6 px-6 py-12 text-center">
            <div className="mx-auto max-w-xl">
              <div className="inline-flex rounded-full border border-accent-300/70 bg-accent-100/90 px-4 py-2 text-sm font-medium text-accent-900">
                まだ画像はありません
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                最初の数枚で、使い心地を試せます。
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                まとめてアップロードすると、処理前後の見比べとファイル名編集がその場でできます。
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
