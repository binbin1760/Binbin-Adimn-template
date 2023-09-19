<template>
  <n-layout has-sider class="layout">
    <n-layout-sider class="n-layout-sider-scroll-container" content-style="padding: 0.5rem 0;" width="20rem">
      <div class="company-logo">宠+</div>
      <sidemenu></sidemenu>
    </n-layout-sider>
    <n-layout-content content-style="background:#F5F7F9;">
      <div class="right">
        <div class="header">
          <n-icon size="2.5rem">
            <div class="icon">
              <List />
            </div>
          </n-icon>
          <n-icon size="2rem">
            <div class="icon">
              <Refresh />
            </div>
          </n-icon>
          <n-breadcrumb>
            <n-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item.key }}</n-breadcrumb-item>
          </n-breadcrumb>
          <div class="ohter">
            <n-avatar round size="large">
              <n-icon size="3rem">
                <PersonSharp />
              </n-icon>
            </n-avatar>
          </div>
        </div>
        <div class="views">
          <div class="TabsView">123</div>
          <div class="mainViews">
            <router-view />
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { sidemenu } from "@/components";
import { useRoute } from "vue-router";
import { List, Refresh, PersonSharp } from '@vicons/ionicons5'
const Route = useRoute()
function getBreadCrumb() {
  const data = Route.matched.map(item => {
    return { key: item.meta.name, value: item.path }
  })
  return data
}
const breadList = computed(() => {
  return getBreadCrumb()
})

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
    font-size: 18px;
    text-align: center;
    color: white;
  }

  .n-layout-sider-scroll-container {
    background-color: #001428 !important;
  }

  .right {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 5px;

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
        right: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }

    .views {
      padding: 0 3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .mainViews {
        flex: 1;
      }
    }
  }
}

.layout .content {
  flex: 1;
}
</style>
