
type name =
  | "input"
  | "select"
  | "checkboxGroup"
  | "radioGroup"
  | "cascader"
  | "handleUpload";

interface basePropsType{
  comp: name,
  keyVal: string,
  value: any
  label: string,
}

interface optionsType {
  label: string;
  value: any;
  disabled?: boolean;
  children?: Array<optionsType>;
}
interface inputType extends basePropsType {
  placeholder:string,
  allInput?: (value: string) => boolean;
}

interface selectType extends basePropsType {
  placeholder: string;
  options: Array<Record<string, any>>;
}

interface checkboxGroupType extends basePropsType {
  options: Array<Record<string, any>>;
}

interface cascaderType extends basePropsType {
  options: optionsType;
}

type handleUploadType = basePropsType 

export type FormItemType = {
  componentName: name;
  keyVal: string;
  label: string;
  value?: any;
  placeholder?: string;
  options?: Array<Record<string, any>>;
};

export type cellComponentType =
  | inputType
  | selectType
  | checkboxGroupType
  | cascaderType
  | handleUploadType;

export const test: cellComponentType[] = [
  {
    comp: 'select',
    keyVal: 'name',
    value: '',
    label: '1321',
    placeholder: '请输入名称！',
    allInput: (value:string) => !value || /^\d+$/.test(value)
  }
]