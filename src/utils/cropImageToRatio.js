import { loadImage } from "./loadImage";

export const cropImageToRatio = async (imageSrc, targetRatio) => {
  const img = await loadImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = img.width;
  const height = img.height;

  let cropWidth, cropHeight;

  if (width / height > targetRatio) {
    cropHeight = height;
    cropWidth = height * targetRatio;
  } else {
    cropWidth = width;
    cropHeight = width / targetRatio;
  }

  const cropX = (width - cropWidth) / 2;
  const cropY = (height - cropHeight) / 2;

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight,
  );

  return canvas.toDataURL("image/png");
};
