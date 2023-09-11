<template>
  <div>
    <n-config-provider
      :theme-overrides="datePicker"
      :locale="zhCN"
      :date-locale="dateZhCN"
    >
      <n-date-picker
        v-model:value="timeRange"
        :type="props.type"
        clearable
        size="small"
        separator=":"
        :actions="['clear', 'confirm']"
        :on-update:value="getTimeRange"
        :close-on-select="true"
      />
    </n-config-provider>
  </div>
</template>
<script setup lang="ts">
import { GlobalThemeOverrides, dateZhCN, zhCN } from "naive-ui";
type Type =
  | "date"
  | "datetime"
  | "daterange"
  | "datetimerange"
  | "month"
  | "monthrange"
  | "year"
  | "quarter";
const props = defineProps<{
  type: Type;
  height: string;
}>();
const timeRange = ref<[number, number]>();
const emit = defineEmits(["updateTime"]);
function getTimeRange(time: number) {
  emit("updateTime", time);
}
const datePicker: GlobalThemeOverrides = {
  Input: {
    heightSmall: props.height,
    borderFocus: "1px solid #409eff ",
    borderHover: "1px solid #409eff ",
    boxShadowFocus: "none",
    caretColor: "black",
  },
};
</script>
<style scoped lang="less"></style>
