import fetch from "@/utils/request";
import {
  SysLogPageRequest,
  SysLogPageResponse,
  CRUDResult,
  DeleteBatchRequest,
} from "@/protoJs";

export class log {
  static log(request: SysLogPageRequest): Promise<SysLogPageResponse> {
    return fetch({
      url: "/admin/log/filter",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: SysLogPageResponse,
      },
    });
  }
  static clearLogs(): Promise<CRUDResult> {
    return fetch({
      url: "/admin/log/clear",
      method: "delete",
      data: {
        resType: CRUDResult,
      },
    });
  }
  static deleteLogs(request: DeleteBatchRequest): Promise<CRUDResult> {
    return fetch({
      url: "/admin/log",
      method: "delete",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
}
