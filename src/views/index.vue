<template>
  <div>
    <layout>
      <template v-slot:side>
        <sidemenu />
      </template>
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
<script setup lang="ts">
import { sidemenu } from "@/components";
</script>
<style scoped></style>
