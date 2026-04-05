"use client";

import type { ContentBounds, MallPreset, ProcessedImageResult } from "@/lib/types";

const ANALYSIS_LIMIT = 640;
const MIN_OUTPUT_DIMENSION = 960;

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getLuminance({ r, g, b }: RgbColor) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getColorDistance(color: RgbColor, background: RgbColor) {
  const dr = color.r - background.r;
  const dg = color.g - background.g;
  const db = color.b - background.b;

  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function loadImageElement(file: File) {
  const url = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;

    await image.decode().catch(
      () =>
        new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error("画像を読み込めませんでした。"));
        }),
    );

    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function sampleBackgroundColor(data: Uint8ClampedArray, width: number, height: number) {
  const patch = Math.max(8, Math.round(Math.min(width, height) * 0.08));
  const points = [
    { xStart: 0, xEnd: patch, yStart: 0, yEnd: patch },
    { xStart: width - patch, xEnd: width, yStart: 0, yEnd: patch },
    { xStart: 0, xEnd: patch, yStart: height - patch, yEnd: height },
    { xStart: width - patch, xEnd: width, yStart: height - patch, yEnd: height },
  ];

  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (const point of points) {
    for (let y = point.yStart; y < point.yEnd; y += 1) {
      for (let x = point.xStart; x < point.xEnd; x += 1) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3] / 255;

        r += data[index] * alpha + 255 * (1 - alpha);
        g += data[index + 1] * alpha + 255 * (1 - alpha);
        b += data[index + 2] * alpha + 255 * (1 - alpha);
        count += 1;
      }
    }
  }

  if (!count) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: r / count,
    g: g / count,
    b: b / count,
  };
}

function detectContentBounds(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  background: RgbColor,
): ContentBounds {
  const backgroundLuminance = getLuminance(background);
  const colorThreshold = backgroundLuminance > 235 ? 24 : 18;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const alpha = data[index + 3];

      if (alpha < 18) {
        continue;
      }

      const opacity = alpha / 255;
      const color = {
        r: data[index] * opacity + 255 * (1 - opacity),
        g: data[index + 1] * opacity + 255 * (1 - opacity),
        b: data[index + 2] * opacity + 255 * (1 - opacity),
      };
      const distance = getColorDistance(color, background);
      const luminance = getLuminance(color);
      const isForeground =
        distance > colorThreshold ||
        (backgroundLuminance > 238 && luminance < backgroundLuminance - 12);

      if (!isForeground) {
        continue;
      }

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < 0 || maxY < 0) {
    return { x: 0, y: 0, width, height };
  }

  const detected = {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
  const areaRatio = (detected.width * detected.height) / (width * height);

  if (areaRatio < 0.035 || areaRatio > 0.96) {
    return { x: 0, y: 0, width, height };
  }

  const expansion = Math.round(Math.max(detected.width, detected.height) * 0.03);

  return {
    x: clamp(detected.x - expansion, 0, width),
    y: clamp(detected.y - expansion, 0, height),
    width: clamp(detected.width + expansion * 2, 1, width),
    height: clamp(detected.height + expansion * 2, 1, height),
  };
}

function resizeSquareCanvas(source: HTMLCanvasElement, size: number) {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("画像の縮小に失敗しました。");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, 0, 0, size, size);

  return canvas;
}

async function canvasToJpegBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("JPEGの書き出しに失敗しました。"));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

async function encodeWithinLimit(
  canvas: HTMLCanvasElement,
  preset: MallPreset,
): Promise<{ blob: Blob; quality: number; outputDimension: number }> {
  const qualitySteps = [
    preset.targetQuality,
    Math.max(0.8, preset.targetQuality - 0.04),
    Math.max(0.74, preset.targetQuality - 0.1),
    Math.max(0.66, preset.targetQuality - 0.16),
    Math.max(0.56, preset.targetQuality - 0.24),
  ];

  let workingCanvas = canvas;
  let bestCandidate: { blob: Blob; quality: number; outputDimension: number } | null = null;

  while (workingCanvas.width >= MIN_OUTPUT_DIMENSION) {
    for (const quality of qualitySteps) {
      const blob = await canvasToJpegBlob(workingCanvas, quality);

      if (!bestCandidate || blob.size < bestCandidate.blob.size) {
        bestCandidate = {
          blob,
          quality,
          outputDimension: workingCanvas.width,
        };
      }

      if (blob.size <= preset.maxBytes) {
        return {
          blob,
          quality,
          outputDimension: workingCanvas.width,
        };
      }
    }

    const nextSize = Math.max(
      MIN_OUTPUT_DIMENSION,
      Math.round(workingCanvas.width * 0.9),
    );

    if (nextSize === workingCanvas.width) {
      break;
    }

    workingCanvas = resizeSquareCanvas(workingCanvas, nextSize);
  }

  if (!bestCandidate) {
    throw new Error("画像の圧縮に失敗しました。");
  }

  return bestCandidate;
}

export async function readImageDimensions(sourceUrl: string) {
  const image = new Image();
  image.decoding = "async";
  image.src = sourceUrl;

  await image.decode().catch(
    () =>
      new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("画像サイズを取得できませんでした。"));
      }),
  );

  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
}

export async function processImageFile(
  file: File,
  preset: MallPreset,
): Promise<ProcessedImageResult> {
  const image = await loadImageElement(file);
  const analysisScale = Math.min(
    1,
    ANALYSIS_LIMIT / Math.max(image.naturalWidth, image.naturalHeight),
  );
  const analysisWidth = Math.max(1, Math.round(image.naturalWidth * analysisScale));
  const analysisHeight = Math.max(1, Math.round(image.naturalHeight * analysisScale));

  const analysisCanvas = createCanvas(analysisWidth, analysisHeight);
  const analysisContext = analysisCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!analysisContext) {
    throw new Error("画像解析の初期化に失敗しました。");
  }

  analysisContext.imageSmoothingEnabled = true;
  analysisContext.imageSmoothingQuality = "high";
  analysisContext.drawImage(image, 0, 0, analysisWidth, analysisHeight);

  const imageData = analysisContext.getImageData(0, 0, analysisWidth, analysisHeight);
  const background = sampleBackgroundColor(imageData.data, analysisWidth, analysisHeight);
  const analyzedBounds = detectContentBounds(
    imageData.data,
    analysisWidth,
    analysisHeight,
    background,
  );
  const scaleBack = 1 / analysisScale;
  const bounds = {
    x: analyzedBounds.x * scaleBack,
    y: analyzedBounds.y * scaleBack,
    width: analyzedBounds.width * scaleBack,
    height: analyzedBounds.height * scaleBack,
  };

  const targetCanvas = createCanvas(preset.dimension, preset.dimension);
  const targetContext = targetCanvas.getContext("2d");

  if (!targetContext) {
    throw new Error("出力キャンバスを作成できませんでした。");
  }

  targetContext.fillStyle = preset.background;
  targetContext.fillRect(0, 0, preset.dimension, preset.dimension);
  targetContext.imageSmoothingEnabled = true;
  targetContext.imageSmoothingQuality = "high";

  const inset = preset.dimension * preset.paddingRatio;
  const availableArea = preset.dimension - inset * 2;
  const renderScale = Math.min(
    availableArea / bounds.width,
    availableArea / bounds.height,
  );
  const contentCenterX = bounds.x + bounds.width / 2;
  const contentCenterY = bounds.y + bounds.height / 2;
  const drawWidth = image.naturalWidth * renderScale;
  const drawHeight = image.naturalHeight * renderScale;
  const drawX = preset.dimension / 2 - contentCenterX * renderScale;
  const drawY = preset.dimension / 2 - contentCenterY * renderScale;

  targetContext.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  const encoded = await encodeWithinLimit(targetCanvas, preset);

  return {
    blob: encoded.blob,
    outputDimension: encoded.outputDimension,
    quality: encoded.quality,
    bounds,
  };
}
