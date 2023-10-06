import { defineStore } from "pinia";
import { store } from "@/store";

export interface tabView {
  fullPath: string;
  meta: any; //根据实际情况断言
  query: object;
  name: any;
  path: string;
  params: object;
}
interface tabViewsList {
  tabViewsList: Array<Partial<tabView>>;
}
export const useTabsViewlist = defineStore({
  id: "tab-views-list",
  state: (): tabViewsList => ({
    tabViewsList: [],
  }),
  getters: {},
  actions: {
    initTabs() {
      const result = localStorage.getItem("tagView");
      if (result) {
        this.tabViewsList = JSON.parse(result as string);
      } else {
        this.tabViewsList = [];
      }
    },
    addTabitem(route: tabView) {
      const isExist = this.tabViewsList.some(
        (item) => item.fullPath === route.fullPath
      );
      if (isExist) {
        return false;
      } else {
        this.tabViewsList.push(route);
      }
    },
    delTabitem(index: number) {
      this.tabViewsList.splice(index, 1);
    },
    saveTabViewsList() {
      localStorage.setItem("tagView", JSON.stringify(this.tabViewsList));
    },
    getTabViewsList() {
      const result = localStorage.getItem("tagView");
      return JSON.parse(result as string);
    },
  },
});

export function tabviewStore() {
  return useTabsViewlist(store);
}
