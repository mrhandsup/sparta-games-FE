export const extractFileName = (contentType: "thumbnail" | "gameFile" | "stillCut", filePath?: string) => {
  const fileName = filePath?.split("/").pop();
  if (!fileName) return "";
  switch (contentType) {
    // thumbnail, stillCut 같은 로직 공유하도록 Fallthrough 문법 적용
    case "thumbnail":
    case "stillCut":
      return decodeURIComponent(fileName?.replace(/_([A-Za-z0-9]+)\.(\w+)$/, ".$2"));
    case "gameFile":
      return decodeURIComponent(fileName?.replace(/^\d+_/, ""));
    default:
      return "";
  }
};
