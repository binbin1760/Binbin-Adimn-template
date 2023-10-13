import { App } from "vue";
import { permission } from "./permission";
export function setupDirectives(app: App) {
  // 权限控制指令（演示）
  app.directive("permission", permission);
}
