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
<style scoped lang="less"></style>
