import axios, { AxiosHeaders } from "axios";
import openNotification from "@/utils/openNotification";
import Cookies from "@/utils/cookie";

// 顯示axios 返回的資料
interface BaseResponse {
  code: string;
  message: string;
  data: { [x: string]: any }[] | { [x: string]: any };
}

// 目前後端資料格式尚未修正為BaseResponse格式, 所以先開後門允許string
interface Error<_T> {
  message: string;
  status: number;
  data: BaseResponse | string;
}

const instance = axios.create({
  // 基本設定
  baseURL: import.meta.env.VITE_REACT_API,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // cookie 設定
    config.headers = new AxiosHeaders({
      Authorization: `Bearer ${Cookies.get("lunar-token")}`,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    // const hasDisposition = response.request.getResponseHeader(
    //   "Content-Disposition"
    // );
    // if (hasDisposition && hasDisposition.indexOf("utf-8''") > -1) {
    //   const data = response.data;
    //   data.fileName = decodeURIComponent(
    //     hasDisposition.split("utf-8''")[1].split(".")[0]
    //   );
    //   return data;
    // }

    return response.data;
  },
  (error) => {
    const { status, data } = error.response;
    const responseErrorData: Error<object> = {
      message: error.message,
      status,
      data,
    };
    openNotification({
      message: "與伺服器溝通失敗",
      description: data.message,
      success: false,
    });
    return Promise.reject(responseErrorData.data);
  }
);

export default instance;
