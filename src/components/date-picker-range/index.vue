<template>
  <div class="date-picker-range">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-date-picker
        :actions="['null']"
        type="daterange"
        :close-on-select="true"
        :value="dateValue"
        :on-update:value="getValue"
      />
      <!-- <n-tooltip
        placement="top-start"
        trigger="click"
        :style="{ background: 'white', color: '#000000', padding: 0 }"
        :arrow-style="{ background: 'white' }"
        :show-arrow="false"
      >
        <template #trigger>
          <NInput
            class="range-input"
            placeholder="请选择日期范围"
            type="text"
          />
        </template>
        <div class="date-table-box">
          <n-date-picker
            class="n-date-panel"
            :actions="['null']"
            panel
            type="daterange"
            :close-on-select="true"
            :update-value-on-close="true"
            :value="dateValue"
            :on-update:value="getValue()"
          />
        </div>
      </n-tooltip> -->
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
  .n-date-panel {
    border-radius: 0 !important;
    --n-calendar-left-padding: 0 !important;
    --n-calendar-right-padding: 0 !important;
    --n-calendar-days-divider-color: "none" !important;
    // --n-calendar-divider-color: "none" !important;
    margin: 0;
  }
}
.range-input {
  width: 30rem;
  --n-height: 4rem !important;
  --n-border-hover: 1px solid #409eff !important;
  --n-border-focus: 1px solid #409eff !important;
  --n-box-shadow-focus: "none" !important;
}
</style>
