<template>
  <div class="date-picker-range">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-date-picker
        ref="datePickerRef"
        :actions="['confirm']"
        type="daterange"
        :close-on-select="true"
        v-model:value="dateValue"
      />
    </n-config-provider>
  </div>
</template>
<script setup lang="ts">
import { dateZhCN, zhCN } from "naive-ui";
import { ref } from "vue";
const datePickerRef = ref<any>(null);
const dateValue = ref<[number, number]>();
</script>
<style scoped lang="less"></style>
