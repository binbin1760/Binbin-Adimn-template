import { createApp } from "vue";
import "./style.css";
import { setupRouter } from "./router/index";
import { setupStore } from "@/store";
import { setupDirectives } from "@/directives";
import App from "./App.vue";

async function initApp() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  setupDirectives(app);
  app.mount("#app", true);
}
void initApp();
