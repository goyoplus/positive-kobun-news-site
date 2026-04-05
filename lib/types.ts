export type MallPresetId = "amazon" | "rakuten" | "yahoo";

export type MallPreset = {
  id: MallPresetId;
  name: string;
  shortLabel: string;
  description: string;
  detail: string;
  dimension: number;
  maxBytes: number;
  paddingRatio: number;
  targetQuality: number;
  background: string;
};

export type ImageStatus = "idle" | "processing" | "done" | "error";

export type ContentBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageItem = {
  id: string;
  file: File;
  originalName: string;
  sourceUrl: string;
  originalWidth: number;
  originalHeight: number;
  originalBytes: number;
  fileName: string;
  nameEdited: boolean;
  status: ImageStatus;
  errorMessage?: string;
  processedBlob?: Blob;
  processedUrl?: string;
  processedBytes?: number;
  outputDimension?: number;
  qualityUsed?: number;
  processedPresetId?: MallPresetId;
};

export type ProcessedImageResult = {
  blob: Blob;
  outputDimension: number;
  quality: number;
  bounds: ContentBounds;
};
