<template>
  <div>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-date-picker
        v-model:value="timeRange"
        type="datetimerange"
        clearable
        size="small"
        separator=":"
        :actions="['clear', 'confirm']"
        :on-update:value="getTimeRange"
      />
    </n-config-provider>
  </div>
</template>
<script setup lang="ts">
import { dateZhCN, zhCN } from "naive-ui";
const timeRange = ref<[number, number]>();
const emit = defineEmits(["updateTime"]);
function getTimeRange(time: number) {
  emit("updateTime", time);
}
</script>
<style scoped lang="less"></style>
