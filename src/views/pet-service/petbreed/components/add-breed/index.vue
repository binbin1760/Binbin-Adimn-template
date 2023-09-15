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
            <div>
              <n-upload
                :max="1"
                @update-file-list="handlePreview"
                list-type="image-card"
              >
                <div>
                  <n-icon size="50" color="#cccc">
                    <AddSharp></AddSharp>
                  </n-icon>
                  <div>图片上传</div>
                </div>
                <n-modal
                  v-model:show="showImgPrview"
                  preset="card"
                  style="width: 600px"
                  title="一张很酷的图片"
                >
                  <img :src="prviewImgUrl" style="width: 100%" />
                </n-modal>
              </n-upload>
            </div>
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
import { UploadFileInfo } from "naive-ui";
import { AddSharp } from "@vicons/ionicons5";
const modelValue = ref({
  breedName: "",
});
const imgName = ref("");
const fileData = ref<any>();
const prviewImgUrl = ref<string>("");
const showImgPrview = ref<boolean>(false);
const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}
// 图片上传
function handlePreview(fileObj: UploadFileInfo[]) {
  const { url, name, file } = fileObj[0];
  imgName.value = name;
  fileData.value = file;
  prviewImgUrl.value = url as string;
  showImgPrview.value = true;
}
async function addBreeddata() {
  const { cosRes, folder } = await uploadOssObj(imgName.value, fileData.value);
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
