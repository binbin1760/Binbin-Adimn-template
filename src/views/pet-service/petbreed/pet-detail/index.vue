<template>
  <div class="form">
    <div class="breed-add">
      <n-form
        ref="formRef"
        :model="modelValue"
        label-placement="left"
        require-mark-placement="left"
        label-width="auto"
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
        <n-form-item label="是否添加图片:" path="inputValue">
          <div>
            <n-upload
              ref="upload"
              :disabled="!modelValue.isRecommend"
              :max="1"
              list-type="image-card"
              :default-upload="false"
            >
              <div class="img-box">
                <n-icon size="60" color="#cccc">
                  <AddSharp></AddSharp>
                </n-icon>
                <div>图片上传</div>
              </div>
            </n-upload>
          </div>
        </n-form-item>
      </n-form>
      <div class="confirm-cancel">
        <n-button @click="closeModal">取消</n-button>
        <n-button color="#169bd5" @click="addBreeddata">确认</n-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { pets } from "@/api";

// import { PetBreedViewModel, MediaMetaModel, MediaMetaType } from "@/protoJs";
// import { uploadOssObj } from "@/utils";
import { AddSharp } from "@vicons/ionicons5";
import { UploadInst } from "naive-ui";
const upload = ref<UploadInst>();
const rootList = ref<any>();
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
// const imgName = ref("");
// const fileData = ref<any>();
// const prviewImgUrl = ref<string>("");
const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}
async function addBreeddata() {
  console.log(upload.value);

  //   const { cosRes, folder } = await uploadOssObj(imgName.value, fileData.value);
  //   const location = cosRes.Location.split("/")[1];
  //   let path = "";
  //   if (folder) {
  //     path = folder + location;
  //   } else {
  //     path = "/" + location;
  //   }
  //   const theme = new MediaMetaModel({
  //     path: path,
  //     type: MediaMetaType.MediaMetaType_PIC,
  //   });
  //   const req = new PetBreedViewModel({
  //     title: modelValue.value.breedName,
  //     isRoot: true,
  //     theme,
  //   });
  //   const result = await pets.addPetbreed(req);
  //   if (result.toObject().value) {
  //     emit("close");
  //   }
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
