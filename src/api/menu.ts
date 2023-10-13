import fetch from "@/utils/request";
import {
  CRUDResult,
  MenuPageRequest,
  MenuViewModel,
  DeleteBatchRequest,
  ButtonWithIdentities,
  MenuPageResponse,
  RoutePageResponse,
} from "@/protoJs";
export class Menu {
  static ownMenu(): Promise<RoutePageResponse> {
    return fetch({
      url: "/admin/menu/own",
      method: "get",
      data: {
        resType: RoutePageResponse,
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
  static detailMenu(id: string): Promise<MenuViewModel> {
    return fetch({
      url: `/admin/menu/${id}`,
      method: "get",
      data: {
        resType: MenuViewModel,
      },
    });
  }
  static buttonWithIdentities(): Promise<ButtonWithIdentities> {
    return fetch({
      url: "/admin/menu/identities",
      method: "POST",
      data: {
        resType: ButtonWithIdentities,
      },
    });
  }
}
