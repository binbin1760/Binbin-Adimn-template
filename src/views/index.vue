<template>
  <div>
    <layout>
      <template v-slot:content>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
    </layout>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
