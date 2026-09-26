import { loadImage } from "./loadImage";
import { generateSlots } from "./generateSlots";

export async function generatePhotostripCanvas({
  layout,
  frame,
  photos,
  filter,
  backgroundColor,
  dateStamp,
  timeStamp,
  showTimeStamp,
  customText,
  showCustomText,
  stickers,
  width,
}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const padding = width / 10;
  const gap = width / 15;
  const ratio = 4 / 3;

  const canvasWidth = width * layout.cols;

  const slots = generateSlots({
    layout,
    canvasWidth,
    padding,
    gap,
    ratio,
  });

  const height = slots[slots.length - 1].y + slots[slots.length - 1].height;
  const canvasHeight = padding + height + padding * 4;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // console.log("canvas width", canvas.width, "canvas height", canvas.height);

  // from Lowest (1) to Highest (5) Layer

  // 1. BACKGROUND COLOR

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. PHOTOS & FILTER

  for (const photo of photos) {
    const slot = slots[photo.id];
    if (photo.src) {
      const img = await loadImage(photo.src);
      ctx.filter = filter.value || "none";
      ctx.drawImage(img, slot.x, slot.y, slot.width, slot.height);
      // console.log("slot ", i, slot.x, slot.y);
    } else {
      // Draw Placeholder
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.setLineDash([6]);
      ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
    }
  }

  // 3. FRAME

  if (frame) {
    const frameImg = await loadImage(frame.src);
    ctx.filter = "none";
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
  }

  // 4. STICKER

  const drawSticker = (ctx, sticker, img) => {
    const canvas = ctx.canvas;

    const x = sticker.x * canvas.width;
    const y = sticker.y * canvas.height;

    const w = sticker.scale * canvas.width;
    const h = (sticker.height / sticker.width) * w;

    ctx.filter = "none";

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate((sticker.rotation * Math.PI) / 180);

    ctx.drawImage(img, -w / 2, -h / 2, w, h);

    ctx.restore();
  };

  if (stickers?.length > 0) {
    for (const sticker of stickers) {
      const img = await loadImage(sticker.src);
      drawSticker(ctx, sticker, img);
    }
  }

  // 5. TEXT

  const columnWidth = canvas.width / layout.cols;
  const fontSize = columnWidth * 0.055;
  ctx.font = `${fontSize}px monospace`; // ex: width 200px, fontSize 11px
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.5;
  const lines = [];
  const appName = "Photobooth";

  // layout 1 cols = text in 3 rows
  // layout 2 cols = text in 2 rows

  if (layout.cols === 1) {
    const row2Text = showTimeStamp ? `${dateStamp} | ${timeStamp}` : dateStamp;
    lines.push(appName);
    lines.push(row2Text);
    if (showCustomText) {
      lines.push(customText);
    }
  } else if (layout.cols === 2) {
    let row1Text = `${appName} | ${dateStamp}`;
    if (showTimeStamp) {
      row1Text += ` | ${timeStamp}`;
    }
    lines.push(row1Text);
    if (showCustomText) {
      lines.push(customText);
    }
  }

  // text positioning (x = center, y = middle in text area)
  const textX = canvas.width / 2;
  const textAreaTop = height + padding;
  const textAreaBottom = canvas.height - padding;
  const textAreaHeight = textAreaBottom - textAreaTop;
  const totalTextHeight = lines.length * lineHeight;
  let textY =
    textAreaTop + (textAreaHeight - totalTextHeight) / 2 + lineHeight / 2;

  console.log("top", textAreaTop, "bottom", textAreaBottom);
  console.log("area height", textAreaHeight, "text height", totalTextHeight);

  console.log("x,y", textX, textY);

  // text rendering
  lines.forEach((line, i) => {
    ctx.fillText(line, textX, textY + i * lineHeight);
  });

  return canvas;
}
