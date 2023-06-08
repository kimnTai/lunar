import Request from "@/api/base/request";
import { AttachmentProps } from "@/interfaces/attachment";

export const newAttachment = (data: {
  cardId: string;
  dirname: string;
  filename: string;
}) => {
  return Request.post<any, PrometheusResponse<AttachmentProps>>(
    `/cards/${data.cardId}/attachments`,
    data
  );
};

export const deleteAttachment = (data: {
  cardId: string;
  attachmentId: string;
}) => {
  return Request.delete<any, PrometheusResponse<AttachmentProps>>(
    `/cards/${data.cardId}/attachments/${data.attachmentId}`
  );
};
