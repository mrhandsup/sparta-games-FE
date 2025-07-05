import { sparta_games_auth } from "../api/axios";

export default async function uploadImageFileToS3(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpeg";

  const presignedResponse = await sparta_games_auth.post("/commons/api/presigned-url/upload/", {
    base_path: "media/images/screenshot/teambuildings",
    extension: "jpeg",
  });

  const { upload_url, url } = presignedResponse.data.data;

  const headers: Record<string, string> = {
    "Content-Type": "image/*",
  };

  console.log(import.meta.env.VITE_DEPLOYMENT_MODE);

  if (import.meta.env.VITE_DEPLOYMENT_MODE === "prod") {
    headers["x-amz-tagging"] = "is_used=false";
  }

  const response = await fetch(upload_url, {
    method: "PUT",
    body: file,
    headers,
  });

  if (!response.ok) {
    throw new Error(`S3 업로드 실패: ${response.status} ${response.statusText}`);
  }

  return url;
}
