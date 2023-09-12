<template>
  <div class="data-table">
    <n-data-table
      class="n-data-table"
      :columns="props.columns"
      :data="props.data"
      :bordered="false"
      :remote="true"
      pagination-behavior-on-filter="current"
      @update-checked-row-keys="handleCheck"
      :style="props.style"
    />
  </div>
</template>
<script setup lang="ts">
import { type DataTableRowKey, DataTableProps } from "naive-ui";
interface props {
  columns?: Required<DataTableProps>["columns"];
  horizontalScroll?: boolean;
  data: any;
  style?: Record<string, string>;
}
const props = defineProps<props>();
const emit = defineEmits(["getRowKey"]);
function handleCheck(rowKeys: DataTableRowKey[]) {
  emit("getRowKey", rowKeys);
}
</script>
<style></style>
<style scoped lang="less">
.n-data-table {
  --n-merged-th-color: white;
}
</style>
