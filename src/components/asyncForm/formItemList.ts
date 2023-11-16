import {
  NSelect,
  NInput,
  NCheckboxGroup,
  NCheckbox,
  NRadioGroup,
  NRadio,
  NUpload,
} from "naive-ui";
import type { UploadInst, UploadCustomRequestOptions } from "naive-ui";
import { defineComponent, PropType, ref } from "vue";

export const inputItem = defineComponent({
  props: {
    value: {
      type: String as PropType<any>,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const inputVal = ref<any>(props.value);
    return () =>
      h(NInput, {
        value: inputVal.value,
        onUpdateValue: (val) => {
          inputVal.value = val;
        },
        placeholder: "请输入",
      });
  },
});

export const selectItem = defineComponent({
  props: {
    value: {
      type: String as PropType<any>,
      required: true,
      default: null,
    },
    options: {
      type: Object as PropType<Array<{ label: string; value: any }>>,
    },
  },
  setup(props) {
    const select = ref(props.options);
    const selectvalue = ref(props.value);
    return () =>
      h(NSelect, {
        value: selectvalue.value,
        options: select.value,
        onUpdateValue: (val) => {
          selectvalue.value = val;
        },
        placeholder: "请选择",
      });
  },
});
// 复选框
export const checkBoxItem = defineComponent({
  props: {
    groupVal: {
      type: Object as PropType<any>,
      required: true,
      default: null,
    },
    options: {
      type: Array as PropType<Array<{ label: string; value: any }>>,
      required: true,
    },
  },
  setup(props) {
    const checkBoxVal = ref(props.groupVal);
    const checkBoxOptions = ref(props.options);

    const groupList = checkBoxOptions.value.map((item) => {
      return h(NCheckbox, { label: item.label, value: item.value });
    });

    return () =>
      h(
        NCheckboxGroup,
        {
          value: checkBoxItem.value,
          onUpdateValue: (val) => {
            checkBoxVal.value = val;
          },
        },
        groupList
      );
  },
});
// 单选框
export const radioItem = defineComponent({
  props: {
    groupValue: {
      type: String as PropType<any>,
      required: true,
      default: null,
    },
    itemOptions: {
      type: Array as PropType<Array<{ label: string; value: any }>>,
      required: true,
    },
  },
  setup(props) {
    const radioValue = ref(props.groupValue);
    const options = ref(props.itemOptions);
    const list = options.value.map((item) => {
      return h(NRadio, { value: item.value, label: item.label });
    });
    return () =>
      h(
        NRadioGroup,
        {
          value: radioValue.value,
          onUpdateValue: (val) => {
            radioValue.value = val;
          },
        },
        list
      );
  },
});
//文件上传  半成品：1.手动上传 2.自定义上传  不完善
export const fileItem = defineComponent({
  props: {
    customUplaod: {
      type: Function as PropType<Function>,
      required: true,
    },
  },
  emits: ["handleUplaod"],
  setup(props, ctx) {
    const { expose } = ctx;
    const customUplaod = props.customUplaod;
    const uplad = ref<UploadInst | null>(null);
    const customRequest = ({ file, data }: UploadCustomRequestOptions) => {
      const formData = new FormData(); //上传的文件
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key as keyof UploadCustomRequestOptions["data"]]
          );
        });
      }
      formData.append(file.name, file.file as File);
      customUplaod(formData); //上传api
    };
    expose({
      uplad: uplad.value?.submit(),
    });
    return h(NUpload, {
      ref: uplad,
      defaultUpload: false,
      customRequest: customRequest,
    });
  },
});
// 联动选择
export const cascaderItem = defineComponent({});
