<template>
  <div class="date-picker-range">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-date-picker
        :actions="['confirm']"
        type="daterange"
        :close-on-select="true"
        :value="dateValue"
        :on-update:value="getValue"
      />
    </n-config-provider>
  </div>
</template>
<script setup lang="ts">
import { dateZhCN, zhCN } from "naive-ui";
import { ref } from "vue";

const dateValue = ref<[number, number]>();
function getValue(time) {
  console.log(time);
}
</script>
<style scoped lang="less">
.date-table-box {
  display: flex;
}
.range-input {
  width: 30rem;
  --n-height: 4rem !important;
  --n-border-hover: 1px solid #409eff !important;
  --n-border-focus: 1px solid #409eff !important;
  --n-box-shadow-focus: "none" !important;
}
</style>
