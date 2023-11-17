import {
  NSelect,
  NInput,
  NCheckboxGroup,
  NCheckbox,
  NRadioGroup,
  NRadio,
  NUpload,
  NCascader,
} from "naive-ui";
import type { UploadInst, UploadCustomRequestOptions } from "naive-ui";
import { defineComponent, PropType, ref, h, inject } from "vue";

// allowInput ： number , CN ,email
const inputItem = defineComponent({
  props: {
    config: {
      type: Object as PropType<any>, //配置的config的类型   如果要自定义类型 必须用PropType
      required: true,
    },
  },
  setup(props) {
    const { value, key } = props.config; //上边的 props
    const inputVal = ref(value); // 双向数据绑定的值
    const formData = inject("formData") as any; //表单form  v-model 绑定的对象
    return () =>
      h(NInput, {
        value: inputVal.value,
        onUpdateValue: (val) => {
          inputVal.value = val;
          formData[key] = val;
        },
        placeholder: "请输入",
      });
  },
});

const selectItem = defineComponent({
  props: {
    config: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const { value, options, key } = props.config;
    const formData = inject("formData") as any;
    const selectvalue = ref(value);
    const select = ref(options);
    return () =>
      h(NSelect, {
        value: selectvalue.value,
        options: select.value,
        onUpdateValue: (val) => {
          selectvalue.value = val;
          formData[key] = val;
        },
        placeholder: "请选择",
      });
  },
});
// 复选框
const checkBoxItem = defineComponent({
  props: {
    config: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const { value, options, key } = props.config;
    const checkBoxVal = ref(value);
    const checkBoxOptions = ref(options);
    const formData = inject("formData") as any;
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
            formData[key] = val;
          },
        },
        { default: () => groupList }
      );
  },
});
// 单选框
const radioItem = defineComponent({
  props: {
    config: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const { value, options, key } = props.config;
    const radioValue = ref(value);
    const radioOptions = ref(options);
    const formData = inject("formData") as any;
    const list = radioOptions.value.map((item) => {
      return h(NRadio, { value: item.value, label: item.label });
    });
    return () =>
      h(
        NRadioGroup,
        {
          value: radioValue.value,
          onUpdateValue: (val) => {
            radioValue.value = val;
            formData[key] = val;
          },
        },
        { default: () => list }
      );
  },
});
//文件上传  半成品：1.手动上传 2.自定义上传  不完善
const fileItem = defineComponent({
  props: {
    config: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  emits: ["handleUplaod"],
  setup(props, ctx) {
    const { expose } = ctx;
    const { value, key } = props.config;
    const upladVal = ref(value);
    const formData = inject("formData") as any;
    const uplad = ref<UploadInst | null>(null);
    const customRequest = ({ file, data }: UploadCustomRequestOptions) => {
      console.log();
      const fileData = new FormData(); //上传的文件
      if (data) {
        Object.keys(data).forEach((item) => {
          fileData.append(
            item,
            data[item as keyof UploadCustomRequestOptions["data"]]
          );
        });
      }
      fileData.append(file.name, file.file as File);
      console.log(fileData);

      if (formData) {
        console.log(upladVal.value);
        formData[key] = fileData;
      }
    };
    expose({
      uplad: uplad.value?.submit(),
    });
    return () =>
      h(
        NUpload,
        {
          ref: uplad,
          defaultUpload: false,
          onChange: () => customRequest,
        },
        { default: () => "文件上传" }
      );
  },
});
// 联动选择
const cascaderItem = defineComponent({
  props: {
    config: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const { value, options, key } = props.config;
    const cascaderVal = ref(value);
    const cascaderOptions = ref(options);
    const formData = inject("formData") as any;
    return () =>
      h(NCascader, {
        value: cascaderVal.value,
        options: cascaderOptions.value,
        onUpdateValue: (val) => {
          cascaderVal.val = val;
          formData[key] = val;
        },
      });
  },
});

export const formItemComponentList = {
  input: inputItem,
  select: selectItem,
  checkBox: checkBoxItem,
  radio: radioItem,
  fileUpload: fileItem,
  cascader: cascaderItem,
};

export function selectFormitem(itemType: string) {
  return formItemComponentList[itemType];
}
