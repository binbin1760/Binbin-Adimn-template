<template>
  <n-space vertical>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-menu
        :collapsed-width="48"
        :collapsed-icon-size="22"
        :collapsed="props.iscollapsed"
        :options="menuOptions"
        :on-update:value="toClickPage"
        :value="currentMenuitem"
        :accordion="true"
        :render-icon="menuIcon"
      />
    </n-config-provider>
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { asyncRoutes } from "@/router/index";
import { useRouter, useRoute } from "vue-router";
import { ChevronForwardCircleOutline } from "@vicons/ionicons5";
const menuOptions = ref<any>();
const props = defineProps<{
  iscollapsed: boolean;
}>();
// 菜单计算
function getMenuItems(router: Array<any>) {
  return router.map((item) => {
    let child;
    if (item.children) {
      child = getMenuItems(item.children);
    }
    return { label: item.meta.name, key: item.path, children: child };
  });
}
menuOptions.value = getMenuItems(asyncRoutes);
const themeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemTextColor: "#BBBBBB",
    itemTextColorActive: "#ffffff",
    itemTextColorActiveHover: "#ffffff",
    itemTextColorHover: "#ffffff",
    itemColorHover: "#288CF0",
    itemColorActive: "#288CF0 ",
    itemColorActiveHover: "#288CF0",
    itemTextColorChildActive: "#288CF0",
    itemTextColorChildActiveHover: "#BBBBBB",
    arrowColorChildActive: "#BBBBBB",
    arrowColorChildActiveHover: "#BBBBBB",
    arrowColor: "#BBBBBB",
    itemIconColor: "#BBBBBB",
    itemIconColorActive: "white",
    itemIconColorHover: "white",
    itemIconColorActiveHover: "white",
    itemColorActiveCollapsed: "#288CF0",
    itemIconColorCollapsed: "white",
    itemIconColorChildActive: "#288CF0",
    itemIconColorChildActiveHover: "white",
    fontSize: "14px",
  },
  Dropdown: {
    optionColorActive: "#288CF0",
    optionTextColorActive: "white",
  },
};
const Router = useRouter();
const Route = useRoute();
function toClickPage(key: string) {
  Router.push(key);
}
// 菜单与路由激活状态绑定
const currentMenuitem = computed(() => {
  return Route.path;
});
const menuIcon = () => {
  return h(NIcon, null, { default: () => h(ChevronForwardCircleOutline) });
};
</script>
<style scoped lang="less"></style>
