import axios from "axios";
import { PBMessageResponse } from "@/protoJs/framework";
import protobuf from "protobufjs";
import { ErrorNo } from "@/protoJs/enums";
const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: false,
  responseType: "arraybuffer",
});
function transformRequest(data: any | null): Blob | null {
  if (data === null) {
    return null;
  }
  return new Blob([data], { type: "buffer" });
}
const transformResponseFactory = (responseType?: any | null) =>
  function (rawResponse: any) {
    // 判断response是否为arrayBuffer
    if (rawResponse == null || !isArrayBuffer(rawResponse)) {
      return rawResponse;
    }

    try {
      const buf = protobuf.util.newBuffer(rawResponse);
      const encryptedResponse = PBMessageResponse.deserialize(buf);
      if (
        encryptedResponse.messageData &&
        encryptedResponse.errorNo === ErrorNo.SUCCESS &&
        responseType
      ) {
        const bufferT = decrypt(encryptedResponse.messageData);
        return responseType.deserializeBinary(bufferT);
      } else {
        return encryptedResponse;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };
function isArrayBuffer(obj: any): boolean {
  return obj.toString() === "[object ArrayBuffer]";
}
http.interceptors.request.use(
  (config) => {
    config.transformResponse = transformResponseFactory(config.data?.resType);
    config.data = transformRequest(config.data?.request);
    config.headers["Accept"] = "application/x-protobuf";
    config.headers["content-type"] = "application/x-protobuf";
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data instanceof PBMessageResponse) {
      // TODO 处理业务异常
      // const { errorNo, msg } = data

      // if (errorNo === ErrorNo.MESSAGE) {
      // const $message = window['$message']
      // $message.error(msg)
      // }
      return Promise.resolve(data);
    }
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { http as request };
