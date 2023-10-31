import { request } from "@/utils";

export function getData() {
  return request({
    url: "/table/data",
    method: "get",
  });
}
