<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      class="n-layout-sider-scroll-container"
      content-style="padding: 0.5rem;"
      width="20rem"
    >
      <div class="company-logo">公司logo</div>
      <sidemenu></sidemenu>
    </n-layout-sider>
    <n-layout-content content-style="padding: 0.5rem;">
      <router-view></router-view>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { sidemenu } from "@/components";
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
    text-align: center;
    color: white;
  }
  .n-layout-sider-scroll-container {
    background-color: #000014;
  }
}

.layout .content {
  flex: 1;
}
</style>
