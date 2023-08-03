<template>
  <div class="layout">
    <div class="side">
      <slot name="side"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.layout .content {
  flex: 1;
  background-color: aqua;
}
</style>
