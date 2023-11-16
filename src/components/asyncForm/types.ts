/**
 * formItem 表单类型：
 *
 * input 普通输入框
 * select 下拉选择框
 * checkBox 复选框
 * radio 单选
 * fileUpload 文件上传
 * imgUpload 图片上传
 * cascader 级联选择   ps:省市联动选择
 * datePicker 事件选择器  ps：这个不是事件范围选择器
 * 。。。。。先就这些，先保证主题完成再说
 */

export type typeFormItem =
  | "input"
  | "select"
  | "checkBox"
  | "radio"
  | "fileUpload"
  // | "imgUpload" //没搞定fileUpload 不忙搞
  | "cascader"
  | "datePicker";
//  rule
export type RuleType = {
  message: string;
  required: boolean;
  trigger: string | string[];
  validator: "email" | "phone" | "bankCard" | "idCard" | "reg"; //校验规则类型 reg 表示正则表达式
};
// 表单配置
export interface typeFormItemConfig {
  type: typeFormItem;
  key: string; //需要收集的数据的名称
  label: string;
  rule?: RuleType; //校验规则
  labelPlacement?: "left" | "top";
}

export interface FormConfig {
  formItem: typeFormItemConfig[];
  rules?: RuleType[];
}
