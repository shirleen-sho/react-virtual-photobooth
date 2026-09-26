export function loadImage(photo) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = photo;
    img.onload = () => resolve(img);
  });
}
