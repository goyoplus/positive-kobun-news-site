const INVALID_FILE_CHARACTERS = /[<>:"/\\|?*\u0000-\u001f]/g;

export function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

export function sanitizeBaseName(value: string) {
  return value
    .trim()
    .replace(INVALID_FILE_CHARACTERS, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/\.+$/g, "")
    .slice(0, 80);
}

export function buildSequentialFileName({
  modelCode,
  index,
  originalName,
}: {
  modelCode: string;
  index: number;
  originalName: string;
}) {
  const baseName =
    sanitizeBaseName(modelCode) ||
    sanitizeBaseName(stripExtension(originalName)) ||
    "image";

  return `${baseName}_${String(index + 1).padStart(2, "0")}.jpg`;
}

export function normalizeOutputFileName(fileName: string, fallback: string) {
  const baseName =
    sanitizeBaseName(stripExtension(fileName)) ||
    sanitizeBaseName(stripExtension(fallback)) ||
    "image";

  return `${baseName}.jpg`;
}

export function isSupportedImageFile(file: File) {
  const lowerName = file.name.toLowerCase();

  return (
    file.type.startsWith("image/") &&
    [".jpg", ".jpeg", ".png", ".webp"].some((extension) =>
      lowerName.endsWith(extension),
    )
  );
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatSignedBytes(bytes: number) {
  const prefix = bytes > 0 ? "+" : "";
  return `${prefix}${formatBytes(bytes)}`;
}

export function formatPercentRatio(before: number, after: number) {
  if (!before) {
    return "0%";
  }

  const ratio = ((after - before) / before) * 100;
  return `${ratio > 0 ? "+" : ""}${ratio.toFixed(0)}%`;
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  link.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
