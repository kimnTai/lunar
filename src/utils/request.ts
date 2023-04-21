import axios, { AxiosInstance } from "axios";
import { openNotification } from "@/utils/openNotification";

// 顯示axios 返回的資料
interface BaseResponse {
  code: string;
  message: string;
  data: { [x: string]: any }[] | { [x: string]: any };
}

// 目前後端資料格式尚未修正為BaseResponse格式, 所以先開後門允許string
interface Error<T> {
  message: string;
  status: number;
  data: BaseResponse | string;
}

let responseErrorData: Error<object>;
const instance: AxiosInstance = axios.create({
  // 基本設定
  baseURL: "localhost:5173",
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    // cookie 設定
    // let auth = `Bearer ${localStorage.getItem("publicToken")}`;
    // config.headers = {
    //   Authorization: auth,
    // };
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const hasDisposition = response.request.getResponseHeader(
      "Content-Disposition"
    );
    if (hasDisposition && hasDisposition.indexOf("utf-8''") > -1) {
      const data = response.data;
      data.fileName = decodeURIComponent(
        hasDisposition.split("utf-8''")[1].split(".")[0]
      );
      return data;
    }

    return response.data;
  },
  (error) => {
    let { status, data } = error.response;
    responseErrorData = {
      message: error.message,
      status,
      data,
    };
    openNotification("與伺服器溝通失敗", error.message, false);
    return Promise.reject(responseErrorData.data);
  }
);

export default instance;
