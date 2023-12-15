import { VNode } from "vue";

export type btnType = {
  class: "add-btn" | "ban-btn";
  color: "#F5F5F5" | "#0083FF";
  label: string;
  clickFn: Function;
  icon: "delIcon" | "addicon" | "reUseIcon" | "banIcon";
};

export type ConfigType = {
  name: "input" | "select" | "date-range";
  label: string;
  keyVal: string;
  value: any;
  labelwidth?: string;
  options?: Array<Record<string, any>>;
};

export type DrawContentType = {
  data: string | string[];
  vnodeName: "labelKey" | "title";
  keyVal?: string;
  label?: string;
  weight?: "400" | "500";
  textcolor?: string;
  downSolt?: VNode;
  rightSolt?: VNode;
};

export type AsyncDraw = {
  name: "Divider" | "Title";
  data: any;
  textColor?: string,
  textWeight?:string
};