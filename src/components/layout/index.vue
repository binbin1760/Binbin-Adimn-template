<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      class="n-layout-sider-scroll-container"
      content-style="padding: 0.5rem 0;"
      width="20rem"
      collapse-mode="width"
      :collapsed="collapsed"
      :collapsed-width="48"
    >
      <div class="company-logo">
        <img class="logo" :src="logo" alt="" />
        <div class="name" v-show="!collapsed">宠+后台管理系统</div>
      </div>
      <sidemenu :iscollapsed="collapsed"></sidemenu>
    </n-layout-sider>
    <n-layout-content content-style="background:#F5F7F9;">
      <div class="right">
        <div class="tab_header">
          <div class="header">
            <n-icon size="2.5rem" @click="collapsed = !collapsed">
              <div class="icon" v-if="collapsed">
                <MenuFoldOutlined />
              </div>
              <div class="icon" v-else>
                <MenuUnfoldOutlined />
              </div>
            </n-icon>
            <n-icon size="2rem">
              <div class="icon" @click="reLoadpage">
                <Refresh />
              </div>
            </n-icon>
            <n-breadcrumb>
              <n-breadcrumb-item
                v-for="(item, index) in breadList"
                :key="index"
                >{{ item.key }}</n-breadcrumb-item
              >
            </n-breadcrumb>
            <div class="ohter">
              <!-- 头像下拉菜单 -->
              <n-dropdown
                trigger="click"
                :options="dropOPtions"
                @select="getDropkey"
              >
                <n-avatar round size="large">
                  <n-icon size="3rem">
                    <PersonSharp />
                  </n-icon>
                </n-avatar>
              </n-dropdown>
            </div>
          </div>
          <tabViews />
        </div>
        <div class="views">
          <div class="mainViews">
            <AppProvider>
              <router-view :key="key" v-slot="{ Component }">
                <component :is="Component" />
              </router-view>
            </AppProvider>
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { sidemenu } from "@/components";
import { useRoute, useRouter } from "vue-router";
import { Refresh, PersonSharp } from "@vicons/ionicons5";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@vicons/antd";
import tabViews from "./tabViews.vue";
import { removeUserInfo } from "@/utils/getUserInfo";
import logo from "@/assets/logo.svg";
const Route = useRoute();
const Router = useRouter();

const collapsed = ref<boolean>(false);
const dropOPtions = ref([
  { label: "个人设置", key: "1", disabled: true },
  { label: "退出登录", key: "2", disabled: false },
]);
function getBreadCrumb() {
  const data = Route.matched.map((item) => {
    return { key: item.meta.name, value: item.path };
  });
  return data;
}
const breadList = computed(() => {
  return getBreadCrumb();
});
function getDropkey(key: string) {
  switch (key) {
    case "2":
      logOut();
      break;
  }
}
function logOut() {
  removeUserInfo();
  Router.push("/login");
}
function reLoadpage() {
  Router.push({
    path: "/redirect/all",
    query: {
      pathdata: Route.path,
      data: Route.query.data,
    },
  });
}
const key = computed(() => {
  return Route.path + Math.random();
});
</script>

<style scoped lang="less">
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  height: 100vh;

  &-default-background {
    background: #f5f7f9;
  }

  .company-logo {
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    .name {
      height: 31px;
      line-height: 38px;
    }
    .logo {
      width: 2.4rem;
      height: 2.48rem;
    }
  }

  .n-layout-sider-scroll-container {
    background-color: #001428 !important;
  }

  .right {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 5px;
    .tab_header {
      .header {
        font-size: 18px;
        height: 6.3rem;
        background-color: white;
        display: flex;
        align-items: center;
        gap: 3.2rem;
        padding: 0 0.5rem;
        position: relative;

        .icon {
          cursor: pointer;
        }

        .ohter {
          position: absolute;
          right: 5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
      }
    }

    .views {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: scroll;
      padding: 0 0.5rem;
      .mainViews {
        flex: 1;
      }
    }
    .views::-webkit-scrollbar {
      display: none;
    }
  }
}

.layout .content {
  flex: 1;
}
</style>
