import { request } from "@/utils";

export function getData() {
  return request({
    url: "/table/data",
    method: "get",
  });
}

export function testMessage() {
  return request({
    url: "/apply/data",
    method: "get",
  });
}
