import fetch from "@/utils/request";
import {
  CRUDResult,
  MenuPageRequest,
  MenuViewModel,
  DeleteBatchRequest,
  ButtonWithIdentities,
  MenuPageResponse,
} from "@/protoJs";
export class Menu {
  static ownMenu(): Promise<CRUDResult> {
    return fetch({
      url: "/admin/menu/own",
      method: "get",
      data: {
        resType: CRUDResult,
      },
    });
  }
  static allMenu(request: MenuPageRequest): Promise<MenuPageResponse> {
    return fetch({
      url: "/admin/menu/all",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: MenuPageResponse,
      },
    });
  }
  static addMenu(request: MenuViewModel): Promise<CRUDResult> {
    return fetch({
      url: "/admin/menu",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static editMenu(request: MenuViewModel): Promise<CRUDResult> {
    return fetch({
      url: "/admin/menu",
      method: "put",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static delMenu(request: DeleteBatchRequest): Promise<CRUDResult> {
    return fetch({
      url: "/admin/menu",
      method: "delete",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static buttonWithIdentities(): Promise<ButtonWithIdentities> {
    return fetch({
      url: "/admin/menu/identities",
      method: "get",
      data: {
        resType: ButtonWithIdentities,
      },
    });
  }
}
