import { RequestConfig } from "../types";
import { request } from "./request";

interface MyRequestConfig<T> extends RequestConfig {
  data?: T;
}
interface MyResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {MyRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
export const myRequest = <D, T = any>(config: MyRequestConfig<D>) => {
  const { method = "GET" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<MyResponse<T>>(config);
};

export default myRequest;
