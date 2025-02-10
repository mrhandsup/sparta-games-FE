export const extractFileName = (contentType: "thumbnail" | "gameFile" | "stillCut", filePath?: string) => {
  const fileName = filePath?.split("/").pop();
  switch (contentType) {
    case "thumbnail":
    case "stillCut":
      return fileName?.replace(/_([A-Za-z0-9]+)\.(\w+)$/, ".$2");
    case "gameFile":
      return fileName?.replace(/^\d+_/, "");
    default:
      return "";
  }
};

export const getMimeType = (ext?: string) => {
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "zip":
      return "application/x-zip-compressed";
    default:
      return "application/octet-stream";
  }
};
