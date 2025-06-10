import sharp from 'sharp';

export async function trimWhiteBorderFromBuffer(
  inputBuffer: Uint8Array | ArrayBuffer,
  tolerance: number = 10
): Promise<Buffer> {
  const image = sharp(inputBuffer);

  try {
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;

    // If channels < 3, don't trim (might be grayscale or indexed)
    if (channels < 3) {
      return image.toBuffer();
    }

    const isWhite = (r: number, g: number, b: number, a?: number) => {
      // If has alpha channel and pixel is transparent, consider it white
      if (channels === 4 && a !== undefined && a < 128) return true;
      return (
        r >= 255 - tolerance && g >= 255 - tolerance && b >= 255 - tolerance
      );
    };

    let top = 0;
    let bottom = height - 1;
    let left = 0;
    let right = width - 1;

    const isRowWhite = (y: number) => {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = channels === 4 ? data[idx + 3] : 255;
        if (!isWhite(r, g, b, a)) return false;
      }
      return true;
    };

    const isColWhite = (x: number) => {
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = channels === 4 ? data[idx + 3] : 255;
        if (!isWhite(r, g, b, a)) return false;
      }
      return true;
    };

    // Find boundaries
    while (top <= bottom && isRowWhite(top)) top++;
    while (bottom > top && isRowWhite(bottom)) bottom--;
    while (left <= right && isColWhite(left)) left++;
    while (right > left && isColWhite(right)) right--;

    // Calculate crop dimensions
    const cropWidth = right - left + 1;
    const cropHeight = bottom - top + 1;

    // Only skip cropping if there's no white border at all, or if result would be extremely small
    if (
      (top === 0 &&
        bottom === height - 1 &&
        left === 0 &&
        right === width - 1) ||
      cropWidth < 4 ||
      cropHeight < 4
    ) {
      return image.toBuffer();
    }

    // Perform the crop
    return sharp(inputBuffer)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .toBuffer();
  } catch (error) {
    // If any error occurs during processing, return original image
    console.warn('Error during image trimming, returning original:', error);
    return image.toBuffer();
  }
}
