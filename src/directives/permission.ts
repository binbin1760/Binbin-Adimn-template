import { ObjectDirective } from "vue";
export const permission: ObjectDirective = {
  async created(el, binding) {
    const btn = binding.value;
    if (btn) return;
    if (!btn) {
      if (!el.parentNode) {
        el.style.display = "none";
      } else {
        el.parentNode.removeChild(el);
      }
    }
  },
};
