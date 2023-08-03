<template>
  <layout>
    <template v-slot:side>
      <div class="side">鼠鼠我啊，自己做模板了</div>
    </template>
    <template v-slot:content> </template>
  </layout>
</template>

<script setup lang="ts">
import layout from "./components/layout.vue";
</script>

<style scoped>
.side {
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1.8rem;
  background-color: rgb(0, 20, 40);
  color: #ffff;
  height: 100vh;
}
</style>
