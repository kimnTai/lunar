import Request from "@/api/base/request";
import type {
    UpdateLabelsProps,
    NewLabelsProps,
    LabelsProps,
    DateLabelsProps,
} from "@/interfaces/labels";

// 取得標籤
export const getLabelApi = (boardId: string) => {
    return Request.get<any, PrometheusResponse<LabelsProps[]>>(
        `/boards/${boardId}/labels`
    );
};

// 新增標籤
export const newCardApi = (data: NewLabelsProps) =>
  Request.post<any, PrometheusResponse<LabelsProps>>(`/boards/${data.boardId}/labels`, data);

// 更新標籤
export const updateLabelApi = (data: UpdateLabelsProps) =>
    Request.put<any, PrometheusResponse<LabelsProps>>(
        `/boards/${data.boardId}/labels/${data.labelId}`,
        data
    );

// 刪除標籤
export const deleteLabelApi = (data: DateLabelsProps) =>
    Request.delete<any, PrometheusResponse<LabelsProps>>(
        `/boards/${data.boardId}/labels/${data.labelId}`
    );