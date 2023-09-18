<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      class="n-layout-sider-scroll-container"
      content-style="padding: 0.5rem 0;"
      width="20rem"
    >
      <div class="company-logo">宠+</div>
      <sidemenu></sidemenu>
    </n-layout-sider>
    <n-layout-content content-style="padding: 0 3rem; background:#F4F9FD;">
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
    font-size: 18px;
    text-align: center;
    color: white;
  }
  .n-layout-sider-scroll-container {
    background-color: #001428 !important;
  }
}

.layout .content {
  flex: 1;
}
</style>
