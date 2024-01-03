import { request } from "@/utils";

export function getData() {
  return request({
    url: "/table/data",
    method: "get",
  });
}
//  测试message组件
export function testMessage() {
  return request({
    url: "/apply/data",
    method: "get",
  });
}

export function testAsyncDraw() {
  return request({
    url: "/draw/data",
    method: "get",
  });
}

export function testPromise() {
  return request({
    url: '/async/data',
    method:'post'
  })
 }