import { FormConfig, RuleType, typeFormItemConfig } from "./types";
import {
  verifyPhone,
  verifyEmail,
  verifyIdCard,
  verifyBankCard,
  verifyReg,
} from "./regUtils";
import { reactive } from "vue";

// 根据formitem 类型 初始化数据收集对象的值
function initFormItemValue(type: string) {
  const initValue = {
    input: "",
    selet: null,
    checkBox: null,
    radio: null,
    fileUpload: null,
    imgUpload: null,
    cascader: null,
    datePicker: null,
  };
  return initValue[type];
}

// 默认验证规则
function initFormItemRule(rules: RuleType) {
  const ruleFnList = {
    email: verifyEmail,
    phone: verifyPhone,
    bankCard: verifyBankCard,
    idCard: verifyIdCard,
    reg: verifyReg,
  };
  return {
    message: rules.message,
    required: rules.required,
    trigger: rules.trigger,
    validator: ruleFnList[rules.validator],
  };
}
// 生成指定的formItemConfig  ps： 缺陷1.默认值  缺陷2.不同的表单组件需要的props不同 例如 select  还需要额外的options
function createFormItemConfig(formItems: typeFormItemConfig[]) {
  return formItems.map((item) => {
    return {
      type: item.key,
      label: item.label,
      key: item.key,
      rule: item.rule ? initFormItemRule(item.rule) : undefined,
    };
  });
}

export function createForm(formConfig: FormConfig) {
  const { formItem } = formConfig;
  const obj = reactive({});
  //生成收集数据的对象
  formItem.forEach((item) => {
    obj[item.key] = initFormItemValue(item.type);
  });
  // 生成配置对象
  const config = createFormItemConfig(formItem);
  // 生成formItem 组件数组  component[]
}
