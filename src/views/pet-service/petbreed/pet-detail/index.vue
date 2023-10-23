<template>
  <div class="form">
    <div class="breed-add">
      <n-form
        ref="formRef"
        :disabled="disabled"
        :model="modelValue"
        label-placement="left"
        require-mark-placement="left"
        label-width="120px"
        :style="{
          maxWidth: '600px',
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
            placeholder="品种名称"
          />
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
        <n-form-item
          label="所属类目:"
          :rule="{
            required: true,
            message: '不能为空',
          }"
        >
          <n-select
            v-model:value="modelValue.pid"
            :options="rootList"
            placeholder="请选择宠物所属类目"
          />
        </n-form-item>
        <n-form-item label="添加品种图片:" path="inputValue">
          <n-upload
            ref="upload"
            :max="1"
            list-type="image-card"
            :default-upload="false"
            :custom-request="customRequest"
            :default-file-list="fileList"
          >
            <div class="img-box">
              <n-icon size="60" color="#cccc">
                <AddSharp></AddSharp>
              </n-icon>
              <div>图片上传</div>
            </div>
          </n-upload>
        </n-form-item>
      </n-form>
      <div class="confirm-cancel" v-if="modelValue.isRecommend">
        <n-button @click="closeModal">取消</n-button>
        <n-button color="#169bd5" @click="addBreeddata">确认</n-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { pets } from "@/api";
import { PetBreedViewModel, MediaMetaModel, MediaMetaType } from "@/protoJs";
import { downloadCosObj, uploadOssObj } from "@/utils";
import { AddSharp } from "@vicons/ionicons5";
import {
  UploadCustomRequestOptions,
  UploadFileInfo,
  UploadInst,
} from "naive-ui";
import { useRoute, useRouter } from "vue-router";
const Route = useRoute();
const Router = useRouter();
async function queryPetData() {
  const petInfo = JSON.parse(Route.query.data as string);
  modelValue.value.breedName = petInfo.title;
  modelValue.value.pid = petInfo.pid;
  modelValue.value.isRecommend = petInfo.isRecommend;
  if (petInfo.path !== "") {
    fileList.value[0].url = await downloadCosObj(petInfo.path);
  } else {
    fileList.value = [];
  }
  disabled.value = petInfo.edit;
}
const upload = ref<UploadInst>();
const rootList = ref<any>();
const disabled = ref<boolean>();
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
  pid: null,
});
const fileList = ref<Array<UploadFileInfo>>([
  {
    url: "",
    name: modelValue.value.breedName,
    id: "1",
    status: "pending",
  },
]);
const imgName = ref();
const fileData = ref<any>();
const emit = defineEmits(["close"]);

queryPetData();
function closeModal() {
  emit("close");
}
function customRequest({ file }: UploadCustomRequestOptions) {
  imgName.value = file.name;
  fileData.value = file.file;
}
async function addBreeddata() {
  const petInfo = JSON.parse(Route.query.petInfo as string);
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
      id: petInfo.id,
      title: modelValue.value.breedName,
      isRecommend: modelValue.value.isRecommend,
      pid: petInfo.pid,
      theme,
    });
    const result = await pets.fixBreed(req);
    if (result.toObject().value) {
      Router.push("/pet-service/petbreed");
    }
  } else {
    const req = new PetBreedViewModel({
      id: petInfo.id,
      title: modelValue.value.breedName,
      isRecommend: modelValue.value.isRecommend,
      pid: petInfo.pid,
    });
    const result = await pets.fixBreed(req);
    if (result.toObject().value) {
      Router.push("/pet-service/petbreed");
    }
  }
}
</script>
<style scoped lang="less">
.form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  box-sizing: border-box;
  gap: 1.6rem;
}
.breed-add {
  width: 40rem;
  display: flex;
  flex-direction: column;
  .imgbox {
    width: 600px;
  }
  .confirm-cancel {
    align-self: center;
    display: flex;
    gap: 0.8rem;
  }
}
</style>
