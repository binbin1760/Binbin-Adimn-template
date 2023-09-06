import axios from "axios";
import { PBMessageResponse, PBMessageRequest } from "@/protoJs/framework";
import protobuf from "protobufjs";
import { ErrorNo } from "@/protoJs/enums";
import { getUserInfo } from "@/utils";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: false,
  responseType: "arraybuffer",
});
function transformRequest(data: any | null): Blob | null {
  const request = PBMessageRequest.fromObject({
    messageData: data ? data : null,
    version: "1.0",
  });
  const bytes = request.serializeBinary();
  return new Blob([bytes], { type: "buffer" });
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
        return responseType.deserializeBinary(encryptedResponse.messageData);
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
const token = getUserInfo();
http.interceptors.request.use(
  (config) => {
    config.transformResponse = transformResponseFactory(config.data?.resType);
    config.data = transformRequest(config.data?.request);
    config.headers["Accept"] = "application/x-protobuf";
    config.headers["content-type"] = "application/x-protobuf";
    config.headers["Authorization"] = `Bearer +${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data instanceof PBMessageResponse) {
      return Promise.resolve(data);
    }
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
