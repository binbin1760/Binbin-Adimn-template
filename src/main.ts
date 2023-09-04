import { createApp } from "vue";
import "./style.css";
import router from "./router/index";
import { setupStore } from "@/store";
import App from "./App.vue";

async function initApp() {
  const app = createApp(App);
  setupStore(app);
  app.use(router);
  app.mount("#app", true);
}
void initApp();
