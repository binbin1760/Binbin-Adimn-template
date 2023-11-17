<template>
  <!-- render的优先级高于 template -->
</template>
<script lang="ts">
import { NForm, useMessage } from "naive-ui";
import { defineComponent, PropType, h, provide } from "vue";
import { typeFormItemConfig } from "./types";
import { selectFormitem } from "./formItemList";

export default defineComponent({
  name: "async-form",

  inheritAttrs: false,

  props: {
    formItemConfig: {
      type: Object as PropType<typeFormItemConfig[]>,
      required: true,
    },
    formConfig: {
      type: Object as PropType<any>,
      required: true,
    },
  },

  setup(props, ctx) {
    const { expose } = ctx;
    const message = useMessage();
    const model = ref(props.formItemConfig);
    // n-form 组件的props对象
    const nFormProps = ref(props.formConfig);
    // form-item 组件表
    const itemList = model.value.map((item) => {
      const itemComponent = selectFormitem(item.type);
      return h(
        NFormItem,
        {
          label: item.label,
          labelPlacement: item.labelPlacement,
        },
        {
          default: () => h(itemComponent, { config: item }),
        }
      );
    });
    const temp = model.value.map((item) => {
      return [item.key, item.value];
    });

    // 数据收集
    const formVal = ref<any>(Object.fromEntries(temp));
    // 使用 provid 与 reject 收集 每一个formitem 的数据
    provide("formData", formVal.value);
    function submit() {
      message.success(JSON.stringify(formVal.value), { duration: 5000 });
      console.log(formVal.value);
    }
    expose({
      submit,
    });
    return () =>
      h(
        NForm,
        {
          model: formVal.value,
          ...nFormProps.value,
        },
        { default: () => itemList }
      );
  },
});
</script>
<style scoped lang="less"></style>
