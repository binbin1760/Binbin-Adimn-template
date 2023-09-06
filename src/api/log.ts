import fetch from "@/utils/request";
import { SysLogPageRequest, PassportResponse } from "@/protoJs";

export class log {
  static log(request: SysLogPageRequest): Promise<PassportResponse> {
    return fetch({
      url: "/admin/log/filter",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: PassportResponse,
      },
    });
  }
}
