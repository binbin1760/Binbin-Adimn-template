<template>
  <div class="button-list">
    <div class="merchant-button">
      <div>条件搜索:</div>
      <n-input
        v-model:value="blurrydata"
        placeholder="请输入商家名称或者联系电话"
        :style="{ width: '250px' }"
        @update:value="getName"
      ></n-input>
    </div>
    <div class="merchant-button">
      <div>审核状态:</div>
      <n-select
        v-model:value="status"
        :options="props.options"
        placeholder="请选择"
        :style="{ width: '189px' }"
        @update:value="getStatus"
      />
    </div>
    <div class="button">
      <n-button
        :style="{ height: '32px', width: '8.8rem' }"
        color="#266FE8"
        @click="queryMerchant"
        >查询</n-button
      >
      <n-button
        :style="{ height: '32px', width: '8.8rem' }"
        color="#E7E7E7"
        text-color="#191919"
        @click="reSetData"
        >重置</n-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { merchant } from "@/api";
import {
  ApprovalStat,
  TableCmsMerchantFilterRequest,
  PagerRequest,
} from "@/protoJs";
import { Merchant } from "@/views/merchant/types";
type Options = {
  label: string;
  value: ApprovalStat;
};
const emit = defineEmits([
  "update:name",
  "update:status",
  "querydata",
  "reSet",
]);
const props = defineProps<{
  options: Array<Options>;
}>();
const blurrydata = ref<string>();
const status = ref<ApprovalStat>();

function reSetData() {
  blurrydata.value = undefined;
  status.value = undefined;
  emit("reSet");
}
async function queryMerchant() {
  const page = new PagerRequest({ pageNumber: 0, pageSize: 5 });
  const req = new TableCmsMerchantFilterRequest({
    page,
    blurry: blurrydata.value,
    stat: ApprovalStat._ApprovalStat_DISABLED,
  });
  const result = (await merchant.merchantList(req)).toObject()
    .raws as unknown as Array<Partial<Merchant>>;
  if (result) {
    emit("querydata", result);
  }
}
function getName() {
  emit("update:name", blurrydata.value);
}
function getStatus() {
  emit("update:status", status.value);
}
</script>
<style scoped lang="less">
.button-list {
  padding-top: 3.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10.5rem;
  flex-wrap: wrap;
  .merchant-button {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 0.8rem;
  }
  .button {
    display: flex;
    align-items: center;
    gap: 4rem;
    font-family: PingFangSC-Medium;
    font-size: 14px;
  }
}
</style>
