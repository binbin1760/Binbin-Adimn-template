<template>
  <n-upload
    ref="uploadRefs"
    :default-upload="false"
    list-type="image-card"
    :max="1"
    :default-file-list="file"
    @change="uploadChange"
  />
</template>
<script setup lang="ts">
import { UploadFileInfo, UploadInst } from "naive-ui";
const props = defineProps<{
  value:any
}>()
const uploadRefs = ref<UploadInst | null>(null);
const file = ref<UploadFileInfo[]>(props.value)
const emit=defineEmits(['UpdateValue'])
function uploadChange(options: { fileList: UploadFileInfo[] }) {
  file.value = options.fileList
  emit('UpdateValue',file.value)
}
</script>
<style scoped lang="less"></style>
