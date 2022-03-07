import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestConfig, RequestInterceptors } from "../types";

class Request {
  instance: AxiosInstance;
  interceptorsObj?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log("全局请求拦截器");
        return res;
      },
      (err) => err
    );

    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );

    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log("全局响应拦截器");
        return res.data;
      },
      (err) => err
    );
  }
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
export default Request;

export const request = new Request({
  baseURL: "",
  timeout: 60 * 5 * 1000,
  interceptors: {
    requestInterceptors: (config) => {
      console.log("实例请求拦截器");
      return config;
    },
    responseInterceptors: (result) => {
      console.log("实例响应拦截");
      return result;
    },
  },
});
