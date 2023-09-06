import fetch from "@/utils/request";
import { CRUDResult } from "@/protoJs/payload";

export function smsService(key: string): Promise<CRUDResult> {
  return fetch({
    url: `/captcha/${key}`,
    method: "post",
    data: {
      resType: CRUDResult,
    },
  });
}
