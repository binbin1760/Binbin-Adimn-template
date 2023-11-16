import {
  verifyBankCard,
  verifyEmail,
  verifyIdCard,
  verifyPhone,
  verifyReg,
} from "./regUtils";
import { RuleType } from "./types";

// 根据formitem 类型 初始化数据收集对象的值
export function initFormItemValue(type: string) {
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
export function initFormItemRule(rules: RuleType) {
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
