/** Resize/compress a browser File to a JPEG data URL for DB upload. */

type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  /** Target max encoded payload size (chars), before JSON overhead. */
  maxChars?: number;
};

export async function compressImageFile(
  file: File,
  opts: CompressOptions = {},
): Promise<string> {
  const maxWidth = opts.maxWidth ?? 1600;
  const maxHeight = opts.maxHeight ?? 1600;
  const maxChars = opts.maxChars ?? 1_200_000;
  let quality = opts.quality ?? 0.85;

  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file (JPEG, PNG, or WebP).");
  }

  const bitmap = await createImageBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image in this browser.");
  }

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > maxChars && quality > 0.45) {
    quality -= 0.08;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }

  if (dataUrl.length > maxChars) {
    throw new Error(
      `Image is still too large (${Math.round(file.size / 1024)}KB original). Try a smaller screenshot or export at lower resolution.`,
    );
  }

  return dataUrl;
}
