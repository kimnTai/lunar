/// <reference types="vite/client" />

interface PrometheusResponse<T = any> {
  status: "success" | "error";
  message?: string;
  result: T;
}

type PrometheusResponseWithToken<T> = PrometheusResponse<T> & {
  token: string;
  websocketUrl: string;
};
