import {
  NSelect,
  NInput,
  NCheckboxGroup,
  NRadioGroup,
  NCascader,
} from "naive-ui";
import HandleUploadVue from "./component/HandleUpload.vue";

const comp = new Map();
comp.set("input", NInput);
comp.set("select", NSelect);
comp.set("checkboxGroup", NCheckboxGroup);
comp.set("radioGroup", NRadioGroup);
comp.set("cascader", NCascader);
comp.set("handleUpload", HandleUploadVue);

export { comp };


