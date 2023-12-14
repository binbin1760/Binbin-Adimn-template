<template>
  <div class="base-form">
    <n-space vertical :size="20">
      重写asyncForm
      <div class="asyncForm">
        <asyncForm :form-items="config"></asyncForm>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { asyncForm } from '@/components'
import { FormItemType } from '@/components/asyncForm/types'

const config = ref<FormItemType[]>([
  {
    componentName: 'input',
    keyVal: "name",
    value: "123",
    placeholder: '请输入名称',
    label:'名称'
  },
  {
    componentName: 'input',
    keyVal: "age",
    value: "12",
    placeholder: '请输入年龄',
    label:'年龄'
  }, {
    componentName: 'select',
    keyVal: 'category',
    value: 1,
    placeholder: '请选择你的品种',
    label: '品种',
    options: [
      { label: '品种1', value: 1 },
      { label: '品种2', value: 2 }
    ]
  }
])
</script>
<style scoped lang="less">
.base-form {
  height: 100%;
  border-radius: 0.8rem;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.6rem;
  .asyncForm{
    width: 400px;
  }
}
</style>
