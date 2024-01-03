<template>
  <n-space :size="36" vertical justify="center">
      <n-form :model="modelObj">
        <n-form-item
        :label="item.label"
        label-placement="left"
        :path="item.keyVal"
        v-for="(item, index) in formItemArr"
        :key="index"
        >
        <FormItem :config="item" />
      </n-form-item>
    </n-form>
    <n-space :size="12"  justify="center">
      <n-button type="info" @click="confirm">
        <slot>提交</slot>
      </n-button>
    </n-space>
  </n-space>
</template>
<script setup lang="ts">
import { FormItemType } from "./types";
import FormItem from "./FormItem.vue";
import { provide } from 'vue'
const props = defineProps<{
  formItems: FormItemType[];
}>();

const formItemArr = ref(props.formItems)
const modelObj = Object.fromEntries(formItemArr.value.map(item => {
  return [item.keyVal, item.value]
}))
const formData = ref(modelObj)

provide('formData', formData.value)

function confirm() { 
  console.log(formData.value);
}

</script>
<style scoped lang="less"></style>
