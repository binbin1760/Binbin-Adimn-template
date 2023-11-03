import { createApp } from "vue";
import { customDialogVue } from "@/components";

export function useMyDialog() {
  const app = () => createApp(customDialogVue);
  let DialogDom: HTMLDivElement;

  function initPop() {
    DialogDom = document.createElement("div");
    app().mount(DialogDom);
    document.body.appendChild(DialogDom);
  }

  function destoryPop() {
    const body = document.getElementsByTagName("body");
    if (body[0].lastChild) {
      document.body.removeChild(body[0].lastChild);
    }
  }
  return {
    initPop,
    destoryPop,
  };
}
