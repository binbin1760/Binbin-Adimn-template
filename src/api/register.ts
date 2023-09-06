import fetch from "@/utils/request";
import { PassportByMobileRequest, PassportResponse } from "@/protoJs/passport";

export class Register {
  static register(request: PassportByMobileRequest): Promise<PassportResponse> {
    return fetch({
      url: "/passport/mobile/lor",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: PassportResponse,
      },
    });
  }
}
