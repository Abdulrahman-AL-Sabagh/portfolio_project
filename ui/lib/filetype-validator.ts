export const allowedImageTypes = [
  ".png",
  ".svg",
  ".jpg",
  ".jpeg",
  ".apng",
  ".avif",
  ".webp",
  ".gif",
];
export const imageTypeValidator = (fileType: string) => {
  return allowedImageTypes.includes(fileType);
};
