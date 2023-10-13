import { defineStore } from "pinia";
import { store } from "@/store";

interface perMissionInfo {
  auth: string[];
  routes: Array<any>;
}

export const useUserPermission = defineStore({
  id: "user-permission-info",
  state: (): perMissionInfo => ({
    auth: [],
    routes: [],
  }),
  getters: {},
  actions: {
    initAuth(auth: string[]) {
      this.auth = auth;
    },
    initRoutes(data) {
      this.routes = data;
    },
  },
});

export function userPermissionStore() {
  return useUserPermission(store);
}
