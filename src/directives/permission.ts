import { ObjectDirective } from "vue";
import { userServe } from "@/api";
async function getBtns() {
  return (await userServe.ownAuthority()).toObject();
}
export const permission: ObjectDirective = {
  async created(el, binding) {
    const btn = binding.value;
    const btnlist = (await getBtns()).authorities;
    if (btnlist?.includes("admin")) return;
    if (!btnlist?.includes(btn)) {
      if (!el.parentNode) {
        el.style.display = "none";
      } else {
        el.parentNode.removeChild(el);
      }
    }
  },
};
