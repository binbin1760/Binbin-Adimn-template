import fetch from "@/utils/request";
import {
  RoleViewModel,
  CRUDResult,
  RolePageResponse,
  DeleteBatchRequest,
} from "@/protoJs";
export class role {
  static addRole(request: RoleViewModel): Promise<CRUDResult> {
    return fetch({
      url: "/admin/role",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static editRole(request: RoleViewModel): Promise<CRUDResult> {
    return fetch({
      url: "/admin/role",
      method: "put",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static queryAllRole(): Promise<RolePageResponse> {
    return fetch({
      url: "/admin/role/all",
      method: "post",
      data: {
        resType: RolePageResponse,
      },
    });
  }
  static batchDelRole(request: DeleteBatchRequest): Promise<CRUDResult> {
    return fetch({
      url: "/admin/role",
      method: "delete",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
}
