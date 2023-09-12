import fetch from "@/utils/request";
import { CosResponse } from "@/protoJs";

export class objectService {
  static getDownLoadVoucher(): Promise<CosResponse> {
    return fetch({
      url: "/object/c/r",
      method: "post",
      data: {
        resType: CosResponse,
      },
    });
  }
  static getUploadVoucher(): Promise<CosResponse> {
    return fetch({
      url: "/object/c/w",
      method: "post",
      data: {
        resType: CosResponse,
      },
    });
  }
}
