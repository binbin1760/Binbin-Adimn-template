import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { store } from "@/store";
import { asyncRoutes } from "@/router/index";
import { Menu } from "@/api";

interface stateDataType {
  ownRoutes: RouteRecordRaw[] | RouteRecordRaw;
}

export const useAsyncRouteStore = defineStore({
  id: "asyncRoutes",
  state: (): stateDataType => ({
    ownRoutes: [],
  }),
  getters: {
    getRoutes(): RouteRecordRaw[] {
      return this.ownRoutes as unknown as RouteRecordRaw[];
    },
  },
  actions: {
    async getUserOwnRoute() {
      const menuData = (await Menu.ownMenu()).toObject().value;
      console.log(menuData, asyncRoutes);
    },
  },
});

export function useAsyncRoute() {
  return useAsyncRouteStore(store);
}
