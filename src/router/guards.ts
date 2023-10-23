import { Router } from "vue-router";
import { getUserInfo, setRolesInfo } from "@/utils";
import { Menu, userServe } from "@/api";
import { whiteList } from "./index";
export function createRouterGuards(Router: Router) {
  Router.beforeEach(async (to, _from, next) => {
    const token = getUserInfo();
    const routes = (await Menu.ownMenu()).toObject().routes?.map((item) => {
      return item.path;
    });
    const auth = (await userServe.ownAuthority()).toObject().authorities;
    setRolesInfo(auth as string[]);
    if (to.path === "/login") {
      next();
    } else {
      if (!token) {
        next({ path: "/login" });
      } else {
        if (
          auth?.includes("admin") ||
          routes?.includes(to.path) ||
          whiteList.includes(to.path)
        ) {
          next();
          return;
        } else {
          next({ path: "/err/409" });
        }
      }
    }
  });
}
