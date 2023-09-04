<template>
  <n-config-provider>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </n-config-provider>
</template>

<script setup lang="ts"></script>

<style scoped></style>
