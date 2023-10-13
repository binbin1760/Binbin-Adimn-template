import { Router } from "vue-router";
import { getUserInfo } from "@/utils";
import { Menu, userServe } from "@/api";
export function createRouterGuards(Router: Router) {
  Router.beforeEach(async (to, from, next) => {
    const token = getUserInfo();
    const routes = (await Menu.ownMenu()).toObject().routes?.map((item) => {
      return item.path;
    });
    const auth = (await userServe.ownAuthority()).toObject().authorities;
    if (to.path === "/login") {
      next();
    } else {
      if (!token) {
        next({ path: "/login" });
      } else {
        if (auth?.includes("admin") || routes?.includes(to.path)) {
          next();
          return;
        } else {
          next({ path: "/login" });
        }
      }
    }
  });
}
