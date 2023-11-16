<template>
  <div class="base-form">
    <n-space vertical :size="20">
      <div>表单重置: 值只能设置为null ,如果设置为undefined不会触发响应式</div>
      <div class="form">
        <!-- <asyncForm></asyncForm> -->
        <span>测试 provide 与 inject</span>
        <child></child>
        <span>这是给子组件的值---{{ childVal }}</span>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
// import { asyncForm } from '@/components'
import child from './child.vue';
import { provide } from "vue"
const childVal = ref('123123')
provide('message', childVal)
</script>
<style scoped lang="less">
.base-form {
  height: 100%;
  border-radius: 0.8rem;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.6rem;

  .form {
    width: 300px;
  }
}
</style>
