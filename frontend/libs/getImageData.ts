export const getImageData = (file: File) => {
  const displayUrl = URL.createObjectURL(file);
  return displayUrl;
};
