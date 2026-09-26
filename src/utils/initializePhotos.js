// Initialize array of photos, length depends on selectedLayout
export const initializePhotos = (layout) => {
  return Array.from({ length: layout.totalPhotos }, (_, i) => ({
    id: i,
    src: null,
  }));
};
