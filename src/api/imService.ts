import fetch from "@/utils/request";
import { UserSignResponse } from "@/protoJs";

export class imService {
  static UserSign(): Promise<UserSignResponse> {
    return fetch({
      url: "/im/ticket",
      method: "post",
      data: {
        resType: UserSignResponse,
      },
    });
  }
}
