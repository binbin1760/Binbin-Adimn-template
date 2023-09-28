<template>
  <n-space vertical>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :collapsed="false"
        :options="menuOptions"
        :on-update:value="toClickPage"
        :value="currentMenuitem"
        :accordion="true"
      />
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import type { GlobalThemeOverrides, MenuOption } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { asyncRoutes } from "@/router/index";
import { useRouter, useRoute } from "vue-router";

// 计算侧栏菜单
function getMenuItems(router: Array<any>) {
  return router.map((MenuItem) => {
    let item: any = {
      label: MenuItem.meta.name,
      key: MenuItem.path,
      meta: MenuItem.meta,
      show: MenuItem.meta?.hidden,
    };

    if (MenuItem.children) {
      const hiddenChildren = MenuItem?.children?.filter((item) => {
        if (item.meta?.hidden) {
          return item;
        }
      });
      if (hiddenChildren?.length === 1) {
        return {
          label: MenuItem.children[0].meta.name,
          key: MenuItem.children[0].path,
          meta: MenuItem.children[0].meta,
          show: MenuItem.children[0].meta?.hidden,
        };
      } else {
        item.children = getMenuItems(MenuItem.children);
      }
    }
    return item;
  });
}
const menuOptions: MenuOption[] = getMenuItems(asyncRoutes);
const themeOverrides: GlobalThemeOverrides = {
  Menu: {
    itemTextColor: "#BBBBBB",
    itemTextColorActive: "#ffffff",
    itemTextColorActiveHover: "#ffffff",
    itemTextColorHover: "#ffffff",
    itemColorHover: "#288CF0 ",
    itemColorActive: "#288CF0 ",
    itemColorActiveHover: "#288CF0",
    itemTextColorChildActive: "#BBBBBB",
    itemTextColorChildActiveHover: "#BBBBBB",
    arrowColorChildActive: "#BBBBBB",
    arrowColorChildActiveHover: "#BBBBBB",
    arrowColor: "#BBBBBB",
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
    };
  },
});
</script>
<style scoped lang="less"></style>
