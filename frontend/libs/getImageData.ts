export const getImageData = (event: React.ChangeEvent<HTMLInputElement>) => {
  const dataTransfer = new DataTransfer();
  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return displayUrl;
};
