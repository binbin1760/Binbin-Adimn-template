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

<script lang="ts" setup>
import { ref } from "vue";
import type { GlobalThemeOverrides } from "naive-ui";
import { NConfigProvider } from "naive-ui";
import { asyncRoutes } from "@/router/index";
import { useRouter, useRoute } from "vue-router";
import { Menu, userServe } from "@/api";
const roleMenuData = ref();
const menuOptions = ref<any>();
// 计算侧栏菜单
Menu.ownMenu().then(async (res) => {
  roleMenuData.value = res.toObject().routes;
  const author = (await userServe.ownAuthority()).toObject().authorities;
  if (author && author.includes("admin")) {
    menuOptions.value = adminMenu(asyncRoutes);
  } else {
    console.log(author);
    const roleRouter = getMenuItems(asyncRoutes, roleMenuData.value);
    menuOptions.value = adminMenu(roleRouter);
  }
});
function adminMenu(router: any) {
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
        item.children = adminMenu(MenuItem.children);
      }
    }
    return item;
  });
}
// 菜单计算
function getMenuItems(router: Array<any>, list: any) {
  const pathList = list.map((it) => {
    return it.path;
  });
  const dir = router.filter((MenuItem) => {
    return pathList.includes(MenuItem.path);
  });
  dir.forEach((it) => {
    const temp = it.children.filter((i) => {
      return pathList.includes(i.path);
    });
    it.children = temp;
  });
  return dir;
}

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
const Router = useRouter();
const Route = useRoute();
function toClickPage(key: string) {
  Router.push(key);
}
// 菜单与路由激活状态绑定
const currentMenuitem = computed(() => {
  return Route.path;
});
</script>
<style scoped lang="less"></style>
