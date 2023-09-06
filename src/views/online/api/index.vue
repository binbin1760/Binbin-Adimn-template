<template>
  <div @click="getLogData()">测试</div>
</template>
<script setup lang="ts">
import { log } from "@/api";
import { SysLogPageRequest } from "@/protoJs";

async function getLogData() {
  const req = new SysLogPageRequest();
  const result = await log.log(req);
  console.log(result.toObject());
}
</script>
<style scoped></style>
