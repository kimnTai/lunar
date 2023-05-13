/// <reference types="vite/client" />

interface PrometheusResponse<T = any> {
  status: "success" | "error";
  message?: string;
  result: T;
  token?: string;
}
