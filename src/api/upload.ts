import Request from "@/api/base/request";

export const newImageFileUrl = (file: Blob) => {
  const formData = new FormData();
  formData.append("image", file, file.name);

  return Request.post<any, PrometheusResponse>(`/upload`, formData);
};
