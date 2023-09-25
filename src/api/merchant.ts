import fetch from "@/utils/request";
import {
  MerchantViewModel,
  CRUDResult,
  TableCmsMerchantFilterRequest,
  TableCmsMerchantFilterResponse,
  TableCmsPurchasePackageFilterRequest,
  TableCmsPurchasePackageFilterResponse,
} from "@/protoJs";
import { ApprovalRequest } from "@/protoJs/cms-approval";
import { PurchasePackageViewModel } from "@/protoJs/purchase-package";
export class merchant {
  static merchantList(
    request: TableCmsMerchantFilterRequest
  ): Promise<TableCmsMerchantFilterResponse> {
    return fetch({
      url: "/merchant/admin/table",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: TableCmsMerchantFilterResponse,
      },
    });
  }
  static examineMerchant(
    merchantId: string,
    request: ApprovalRequest
  ): Promise<CRUDResult> {
    return fetch({
      url: `/merchant/admin/approval/${merchantId}`,
      method: "put",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static merchantDetail(merchantId: string): Promise<MerchantViewModel> {
    return fetch({
      url: `/merchant/admin/${merchantId}`,
      method: "get",
      data: {
        resType: MerchantViewModel,
      },
    });
  }
  static merchantApproval(
    merchantId: string,
    request: ApprovalRequest
  ): Promise<CRUDResult> {
    return fetch({
      url: `/merchant/admin/approval/${merchantId}`,
      method: "put",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static packageList(
    request: TableCmsPurchasePackageFilterRequest
  ): Promise<TableCmsPurchasePackageFilterResponse> {
    return fetch({
      url: "/purchase_pkg/admin/filter",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: TableCmsPurchasePackageFilterResponse,
      },
    });
  }
  static packageDetail(id: string): Promise<PurchasePackageViewModel> {
    return fetch({
      url: `/purchase_pkg/admin/${id}`,
      method: "get",
      data: {
        resType: PurchasePackageViewModel,
      },
    });
  }
  static packageApproval(
    id: string,
    request: ApprovalRequest
  ): Promise<CRUDResult> {
    return fetch({
      url: `/purchase_pkg/admin/approval/${id}`,
      method: "put",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
}
