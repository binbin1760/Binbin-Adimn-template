<template>
  <n-space vertical>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :collapsed="false"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :expand-icon="expandIcon"
        :on-update:value="toClickPage"
        :value="currentMenuitem"
      />
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { h, ref, defineComponent } from "vue";
import { NIcon } from "naive-ui";
import type { GlobalThemeOverrides, MenuOption } from "naive-ui";
import { CaretDownOutline } from "@vicons/ionicons5";
import { NConfigProvider } from "naive-ui";
import { constantRoute } from "@/router/index";
import { useRouter, useRoute } from "vue-router";

// 计算侧栏菜单
function getMenuItems(router: Array<any>) {
  return router.map((MenuItem) => {
    const item: any = {
      label: MenuItem.meta.name,
      key: MenuItem.path,
      meta: MenuItem.meta,
    };
    if (!MenuItem.meta.isRoot && MenuItem.children) {
      item.children = getMenuItems(MenuItem.children);
    }
    return item;
  });
}
const menuOptions: MenuOption[] = getMenuItems(constantRoute);
const themeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemTextColor: "#ffffff",
    itemIconColor: "#ffffff",
    itemTextColorActive: "red",
    itemIconColorActive: "red",
    itemTextColorHover: "green",
    itemIconColorHover: "green",
    fontSize: "14px",
  },
};

export default defineComponent({
  setup() {
    const Router = useRouter();
    const Route = useRoute();
    function toClickPage(key: string) {
      Router.push(key);
    }
    // 菜单与路由激活状态绑定
    const currentMenuitem = computed(() => {
      return Route.path;
    });
    return {
      collapsed: ref(true),
      menuOptions,
      themeOverrides,
      toClickPage,
      currentMenuitem,
      renderMenuLabel(option: MenuOption) {
        return option.label as string;
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>
<style scoped lang="less"></style>
