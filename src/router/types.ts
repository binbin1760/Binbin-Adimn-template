import type { RouteRecordRaw } from "vue-router";

export interface Meta {
  isRoot: boolean;
  name: string;
}
export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}
