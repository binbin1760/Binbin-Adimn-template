<template>
  <div class="button-list">
    <div class="merchant-button">
      <div>商家名称:</div>
      <n-input
        v-model:value="name"
        placeholder="请输入"
        :style="{ width: '200px' }"
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
    <div class="merchant-button">
      <div>联系电话:</div>
      <n-input
        v-model:value="phone"
        placeholder="请选择"
        :style="{ width: '200px' }"
        @update:value="getPhone"
      ></n-input>
    </div>
    <div class="button">
      <n-button :style="{ height: '32px', width: '8.8rem' }" color="#266FE8"
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
type Options = {
  label: string;
  value: string;
};
const emit = defineEmits(["update:name", "update:status", "update:phone"]);
const props = defineProps<{
  options: Array<Options>;
}>();
const name = ref<string>();
const status = ref<string>();
const phone = ref<string>();

function reSetData() {
  name.value = undefined;
  status.value = undefined;
  phone.value = undefined;
}

function getName() {
  emit("update:name", name.value);
}
function getStatus() {
  emit("update:status", status.value);
}
function getPhone() {
  emit("update:phone", phone.value);
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
