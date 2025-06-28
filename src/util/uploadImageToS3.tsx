import { sparta_games_auth } from "../api/axios";

export default async function uploadImageFileToS3(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpeg";

  const presignedResponse = await sparta_games_auth.post("/commons/api/presigned-url/upload/", {
    base_path: "media/images/screenshot/teambuildings",
    extension: "jpeg",
  });

  const { upload_url, url } = presignedResponse.data.data;

  const response = await fetch(upload_url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "image/*",
    },
  });

  if (!response.ok) {
    throw new Error(`S3 업로드 실패: ${response.status} ${response.statusText}`);
  }

  return url;
}
