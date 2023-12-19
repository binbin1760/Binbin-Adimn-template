import {
  NSelect,
  NInput,
  NCascader,
} from "naive-ui";
import HandleUploadVue from "./component/HandleUpload.vue";
import RadioGroupVue from "./component/RadioGroup.vue";
import CheckBoxGroupVue from "./component/CheckBoxGroup.vue";

const comp = new Map();
comp.set("input", NInput);
comp.set("select", NSelect);
comp.set("checkboxGroup", CheckBoxGroupVue);
comp.set("radioGroup", RadioGroupVue);
comp.set("cascader", NCascader);
comp.set("handleUpload", HandleUploadVue);

export { comp };


