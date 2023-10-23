import { Router } from "vue-router";
export function createRouterGuards(Router: Router) {
  Router.beforeEach(async (_to, _from, next) => {
    next();
  });
}
