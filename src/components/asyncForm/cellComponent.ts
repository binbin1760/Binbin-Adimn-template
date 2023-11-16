import { NFormItem } from "naive-ui";
import { typeFormItemConfig } from "./types";
import { defineComponent, PropType } from "vue";

export function creatFormItem(obj: typeFormItemConfig) {
  return defineComponent({
    props: {
      value: {
        type: Object as PropType<any>,
        required: true,
      },
    },
    setup() {
      return h(NFormItem, {
        label: obj.label,
        path: obj.key,
        labelPlacement: obj.labelPlacement,
      });
    },
  });
}
