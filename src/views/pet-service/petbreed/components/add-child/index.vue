<template>
  <div>
    <n-card title="新增品种" closable @close="closeModal">
      <div class="add-petbreed">
        <n-form
          ref="formRef"
          :model="modelValue"
          label-placement="left"
          :style="{
            maxWidth: '800px',
          }"
        >
          <n-form-item
            label="品种名称:"
            path="breedName"
            :rule="{
              required: true,
              message: '不能为空',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="modelValue.breedName"
              placeholder="宠物品种名称"
            />
          </n-form-item>

          <n-form-item label="添加品种图片:" path="inputValue">
            <div>
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
            </div>
          </n-form-item>

          <n-form-item label="是否推荐:">
            <n-radio-group
              v-model:value="modelValue.isRecommend"
              name="left-size"
            >
              <n-radio-button :value="true"> 是 </n-radio-button>
              <n-radio-button :value="false"> 否 </n-radio-button>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="所属类目">
            <n-select
              v-model:value="modelValue.pid"
              :options="rootList"
              placeholder="请选择宠物所属类目"
            />
          </n-form-item>
        </n-form>
        <!-- <div class="is_recommend">
      <div class="recommend">主体分类:</div>
      <n-radio-group v-model:value="isRoot" name="left-size">
        <n-radio-button :value="true"> 是 </n-radio-button>
        <n-radio-button :value="false"> 否 </n-radio-button>
      </n-radio-group>
    </div> -->
        <n-button
          @click="upLoadpetBreed"
          :style="{ width: '10rem' }"
          size="large"
          color="#409EFF"
          >确认新增</n-button
        >
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { AddSharp } from "@vicons/ionicons5";
import { UploadCustomRequestOptions, UploadInst } from "naive-ui";
import { uploadOssObj } from "@/utils";
import { MediaMetaModel, MediaMetaType, PetBreedViewModel } from "@/protoJs";
import { pets } from "@/api";
const rootList = ref<any>();
const emit = defineEmits(["close"]);
pets.classificationPet().then((res) => {
  const result: any = res.toObject().raws ? res.toObject().raws : [];
  const list = result.map((item: any) => {
    if (item.isRoot) {
      return { label: item.title, value: item.id };
    }
  });
  rootList.value = list;
});
const modelValue = ref({
  breedName: "",
  isRecommend: false,
  pid: "",
});
const imgName = ref();
const fileData = ref<any>();
const upload = ref<UploadInst>();
async function customRequest({ file }: UploadCustomRequestOptions) {
  imgName.value = file.name;
  fileData.value = file.file;
}
async function upLoadpetBreed() {
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
      theme,
      isRecommend: modelValue.value.isRecommend,
      pid: modelValue.value.pid,
    });
    const result = await pets.addPetbreed(req);
    if (result.toObject().value) {
      emit("close");
    }
  } else {
    const req = new PetBreedViewModel({
      title: modelValue.value.breedName,
      isRecommend: modelValue.value.isRecommend,
      pid: modelValue.value.pid,
    });
    const result = await pets.addPetbreed(req);
    if (result.toObject().value) {
      emit("close");
    }
  }
}

function closeModal() {
  emit("close");
}
</script>
<style scoped lang="less">
.add-petbreed {
  width: 40rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
</style>
