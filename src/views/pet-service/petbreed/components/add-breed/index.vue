<template>
  <div class="form">
    <n-card title="新增类目" closable @close="closeModal">
      <div class="breed-add">
        <n-form
          ref="formRef"
          :model="modelValue"
          label-placement="left"
          :style="{
            maxWidth: '800px',
          }"
        >
          <n-form-item
            label="类目名称:"
            path="breedName"
            :rule="{
              required: true,
              message: '不能为空',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="modelValue.breedName"
              placeholder="类目名称"
            />
          </n-form-item>
          <n-form-item label="是否添加图片:" path="inputValue">
            <n-upload
              :max="1"
              list-type="image-card"
              ref="upload"
              :default-upload="false"
              :custom-request="customRequest"
            >
              <div>
                <n-icon size="50" color="#cccc">
                  <AddSharp></AddSharp>
                </n-icon>
                <div>图片上传</div>
              </div>
            </n-upload>
          </n-form-item>
        </n-form>
        <div class="confirm-cancel">
          <n-button @click="closeModal">取消</n-button>
          <n-button color="#169bd5" @click="addBreeddata">确认</n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { pets } from "@/api";
import { PetBreedViewModel, MediaMetaModel, MediaMetaType } from "@/protoJs";
import { uploadOssObj } from "@/utils";
import { UploadCustomRequestOptions, UploadInst } from "naive-ui";
import { AddSharp } from "@vicons/ionicons5";
const modelValue = ref({
  breedName: "",
});
const imgName = ref();
const fileData = ref<any>();
const upload = ref<UploadInst>();
const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}
// 图片上传
async function customRequest({ file }: UploadCustomRequestOptions) {
  imgName.value = file.name;
  fileData.value = file.file;
}
async function addBreeddata() {
  upload.value?.submit();
  if (imgName.value !== undefined) {
    const { cosRes, folder } = await uploadOssObj(
      imgName.value,
      fileData.value
    );
    const location = cosRes.Location.split("/")[1];
    let path = "";
    if (folder) {
      path = folder + location;
    } else {
      path = "/" + location;
    }
    const theme = new MediaMetaModel({
      path: path,
      type: MediaMetaType.MediaMetaType_PIC,
    });
    const req = new PetBreedViewModel({
      title: modelValue.value.breedName,
      isRoot: true,
      theme,
    });
    const result = await pets.addPetbreed(req);
    if (result.toObject().value) {
      emit("close");
    }
  } else {
    const req = new PetBreedViewModel({
      title: modelValue.value.breedName,
      isRoot: true,
    });
    const result = await pets.addPetbreed(req);
    if (result.toObject().value) {
      emit("close");
    }
  }
}
</script>
<style scoped lang="less">
.breed-add {
  width: 40rem;
  display: flex;
  flex-direction: column;
  .breed-list {
    width: 40rem;
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 4px;
    height: 11.8rem;
    overflow-y: scroll;
    .list-item {
      color: #aaa;
      font-size: 14px;
      width: 100%;
      border-bottom: 1px solid rgba(215, 215, 215, 1);
      padding: 8px 8px;
    }
    .list-item:last-child {
      border-bottom: 0px solid red;
    }
  }

  .breed-list::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .confirm-cancel {
    align-self: flex-end;
    display: flex;
    gap: 0.8rem;
  }
}
</style>
