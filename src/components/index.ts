import Layout from "./layout/index.vue";
import sidemenu from "./side-menu/index.vue";
import DataTable from "./data-table/index.vue";
import DatePickerRange from "./date-picker-range/index.vue";
import AppProvider from "./AppProvider/index.vue";
import customDialogVue from "./popupComponents/customDialog.vue";
import Logo from "./Logo/index.vue";
import asyncForm from "./asyncForm/index.vue";
import DrawContent from "./DrawContent/index.vue";

export {
  Layout,
  sidemenu,
  DataTable,
  DatePickerRange,
  AppProvider,
  customDialogVue,
  Logo,
  asyncForm,
  DrawContent,
};
export * from "../components";
// 导出每个组件下边base中的方法
export * from "./data-table/base"; //表格组件中的常用方法
export * from "./asyncForm/base"; //表格组件相关常用方法
export * from "./baseTypes"; // compents 全部的类型
export * from "./asyncForm/types"