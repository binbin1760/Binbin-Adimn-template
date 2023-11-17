<template>
  <div class="base-form">
    <n-space vertical :size="20">
      <div class="form">
        <div>动态表单</div>
        <asyncForm
          ref="asyncFormRef"
          :form-config="formProps"
          :form-item-config="model"
        ></asyncForm>
        <n-button type="info" @click="submit">提交</n-button>
      </div>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { asyncForm } from "@/components";
import { typeFormItemConfig } from "@/components/asyncForm/types";
const asyncFormRef = ref<any>(null);
const formProps = ref({
  labelPlacement: "left",
  labelWidth: "120px",
  style: {
    border: "1px solid #cccccc",
    padding: "1.6rem",
    borderRadius: "12px",
    width: "350px",
  },
});
const model = ref<typeFormItemConfig[]>([
  {
    type: "input",
    key: "name",
    value: "",
    label: "名字",
    labelPlacement: "left",
  },
  {
    type: "input",
    key: "serch",
    value: "",
    label: "搜索内容",
    labelPlacement: "left",
  },
  {
    type: "fileUpload",
    key: "file",
    value: "",
    label: "文件上传",
    labelPlacement: "left",
  },
  {
    type: "select",
    key: "peet",
    value: null,
    label: "品种",
    options: [
      { label: "猫猫", value: "cat" },
      { label: "狗子", value: "dog" },
      { label: "热狗", value: "hotdog" },
    ],
    labelPlacement: "left",
  },
  {
    type: "checkBox",
    key: "peet2",
    value: null,
    label: "品种",
    options: [
      { label: "猫猫", value: "cat" },
      { label: "狗子", value: "dog" },
      { label: "热狗", value: "hotdog" },
    ],
    labelPlacement: "left",
  },
]);
function submit() {
  asyncFormRef.value.submit();
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  }
}
</style>
