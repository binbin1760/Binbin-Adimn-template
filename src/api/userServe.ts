import fetch from "@/utils/request";
import {
  TableCmsUsrFilterRequest,
  TableCmsUsrFilterResponse,
  CmsUsrRoleRequest,
  CRUDResult,
  AuthorityResponse,
} from "@/protoJs";

export class userServe {
  static getUserData(
    request: TableCmsUsrFilterRequest
  ): Promise<TableCmsUsrFilterResponse> {
    return fetch({
      url: "/admin/usr/filter",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: TableCmsUsrFilterResponse,
      },
    });
  }

  static editUser(request: CmsUsrRoleRequest): Promise<CRUDResult> {
    return fetch({
      url: "/admin/usr/role",
      method: "put",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }

  static ownAuthority(): Promise<AuthorityResponse> {
    return fetch({
      url: "/profile/admin/authorities",
      method: "get",
      data: {
        resType: AuthorityResponse,
      },
    });
  }
}
