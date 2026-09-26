export function generateSlots({ layout, canvasWidth, padding, gap, ratio }) {
  const { rows, cols } = layout;

  const slotWidth = (canvasWidth - padding * 2 - gap * (cols - 1)) / cols;
  const slotHeight = slotWidth / ratio;

  const slots = [];

  for (let i = 0; i < rows * cols; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const x = padding + col * (slotWidth + gap);
    const y = padding + row * (slotHeight + gap);

    slots.push({
      x,
      y,
      width: slotWidth,
      height: slotHeight,
    });
  }
  return slots;
}
