<template>
  <div class="data-table">
    <n-data-table
      ref="tableHeight"
      class="n-data-table"
      :columns="props.columns"
      :data="props.data"
      :bordered="true"
      flex-height
      pagination-behavior-on-filter="current"
      @update-checked-row-keys="handleCheck"
      :style="props.style"
    >
    </n-data-table>
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
.data-table {
  height: 100%;
  display: flex;
  .n-data-table {
    flex: 1;
    border-radius: 5px;
    overflow: hidden;
    --n-merged-th-color: #fafafc;
  }
  .n-data-table :deep(.n-data-table-td.n-data-table-td--last-row) {
    border-bottom: 1px solid var(--n-merged-border-color) !important;
  }
}
</style>
