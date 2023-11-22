<template>
  <div class="base-pop">
    <div>二次封装dialog，hooks中集中管理样式</div>
    <NButton type="info" @click="openDialog"> 启动自定义dialog </NButton>
    <div>二次封装message ,hooks集中管理样式</div>
    <NButton type="info" @click="getData">启动自定义Message</NButton>
    <div>异步请求，loading success error</div>
    <NButton type="info">网络请求响应</NButton>
  </div>
</template>
<script setup lang="ts">
import { useMyDialog, customMessage } from "@/hooks";
import { testMessage } from "@/api";
const { showDialog } = useMyDialog();
const { loadingMessage } = customMessage();

function openDialog() {
  showDialog("提示", "Dialog已启动", () => {});
}

async function getData() {
  const result = await testMessage();
  const data = JSON.parse(result as unknown as any).data.a;
  loadingMessage("正在请求，请稍等", "loading", 0);
  if (data) {
    loadingMessage("操作成功", "success", 1500);
  } else {
    loadingMessage("操作失败", "error", 1500);
  }
}
</script>
<style scoped lang="less">
.base-pop {
  height: 100%;
  flex: 1;
  padding: 1.6rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
}
</style>
