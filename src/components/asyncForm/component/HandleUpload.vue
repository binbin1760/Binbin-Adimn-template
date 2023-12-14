<template>
  <n-upload
    ref="uploadRefs"
    :default-upload="false"
    list-type="image-card"
    :max="1"
    @change="uploadChange"
  />
</template>
<script setup lang="ts">
import { UploadFileInfo, UploadInst } from "naive-ui";
const uploadRefs = ref<UploadInst | null>(null);
const file=ref<UploadFileInfo>()
function uploadChange(options: { fileList: UploadFileInfo[] }) {
    file.value = options.fileList[0]
}
</script>
<style scoped lang="less"></style>
