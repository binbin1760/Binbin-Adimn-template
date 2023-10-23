import { ObjectDirective } from "vue";
import { getRolesInfo } from "@/utils";
export const permission: ObjectDirective = {
  async created(el, binding) {
    const btn = binding.value;
    const perList = getRolesInfo();
    if (perList?.includes("admin")) return;
    if (!perList?.includes(btn)) {
      if (!el.parentNode) {
        el.style.display = "none";
      } else {
        el.parentNode.removeChild(el);
      }
    }
  },
};
