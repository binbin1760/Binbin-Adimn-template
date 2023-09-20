<template>
  <div class="operate">
    <n-button size="small" color="#1990FF" @click="showModal = true"
      >编辑</n-button
    >
    <n-button size="small" color="#FF4A4A">删除</n-button>
    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="{ width: '600px' }"
      transform-origin="center"
    >
      <template #default>
        <div>
          <menuForm></menuForm>
        </div>
      </template>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import menuForm from "../form-list/menuForm.vue";
const showModal = ref<boolean>(false);
</script>
<style scoped lang="less">
.operate {
  width: initial;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}
</style>
