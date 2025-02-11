const VALID_FILE_TYPES = ["zip", "7z"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

export const checkFileType = (file: File): boolean => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension ? VALID_FILE_TYPES.includes(extension) : false;
};

export const checkFileSize = (file: File, maxSize: number): boolean => file.size <= maxSize;

export const checkFileExtension = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension && ALLOWED_EXTENSIONS.includes(extension);
};
