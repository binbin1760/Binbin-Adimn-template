
type name =
  | "input"
  | "select"
  | "checkboxGroup"
  | "radioGroup"
  | "cascader"
  | "handleUpload";

export type FormItemType = {
  componentName: name;
  keyVal: string;
  value: any;
  placeholder: string;
  label: string
  options?:Array<Record<string,any>>
};
