<template>
  <div class="base-form">
    <n-space vertical :size="20">
      <div>表单重置: 值只能设置为null ,如果设置为undefined不会触发响应式</div>
      <div class="form">
        <n-form v-model:value="formObj" label-placement="left">
          <n-form-item label="input初始化:" path="inputValue">
            <n-input v-model:value="formObj.inputValue"></n-input>
          </n-form-item>
          <n-form-item label="select初始化:" path="selectValue">
            <n-select v-model:value="formObj.selectValue" :options="selectOptinos"></n-select>
          </n-form-item>
          <n-form-item label="checkBox初始化:" path="checkBoxValue">
            <n-checkbox-group v-model:value="formObj.checkBoxValue">
              <n-space item-style="display: flex;">
                <n-checkbox value="Beijing" label="北京" />
                <n-checkbox value="Shanghai" label="上海" />
                <n-checkbox value="Guangzhou" label="广州" />
                <n-checkbox value="Shenzen" label="深圳" />
              </n-space>
            </n-checkbox-group>
          </n-form-item>
          <n-form-item label="radio初始化:" path="radioValue">
            <n-radio-group v-model:value="formObj.radioValue">
              <n-radio key="1" value="成都">成都</n-radio>
              <n-radio key="2" value="峨眉山">峨眉山</n-radio>
              <n-radio key="3" value="乐山">乐山</n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="cascader初始化:" path="cascaderValue">
            <n-cascader v-model:value="formObj.cascaderValue" :options="cascaderOptions" check-strategy="child"
              size="small" />
          </n-form-item>
          <n-form-item label="datePicker初始化:" path="datePickerValue">
            <n-date-picker v-model:value="formObj.datePickerValue" type="datetime" clearable />
          </n-form-item>
          <n-form-item>
            <n-button type="info" @click="reSetData">重置数据</n-button>
          </n-form-item>
        </n-form>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
const selectOptinos = [{
  label: "选择1",
  value: 1
}, {
  label: "选择2",
  value: 2
}, {
  label: "选择3",
  value: 3
}]
const cascaderOptions = [{
  label: '四川',
  value: '1',
  children: [
    {
      label: '成都',
      value: '2',
    }
  ]
}, {
  label: '湖北',
  value: '3',
  children: [
    {
      label: '武汉',
      value: '4',
      children: [{
        label: "武汉某个街道",
        value: "武汉某个街道"
      }]
    }
  ]
}]
let formObj = reactive({
  inputValue: "",
  selectValue: null,
  checkBoxValue: null,
  radioValue: null,
  cascaderValue: null,
  datePickerValue: null,
})

function reSetData() {
  formObj.cascaderValue = null
  formObj.checkBoxValue = null
  formObj.datePickerValue = null
  formObj.inputValue = ""
  formObj.radioValue = null
  formObj.selectValue = null
}
</script>
<style scoped lang="less">
.base-form {
  height: 100%;
  border-radius: 0.8rem;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.6rem;

  .form {
    width: 300px;
  }
}
</style>
