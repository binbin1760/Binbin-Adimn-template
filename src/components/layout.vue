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

<script setup lang="ts">
</script>

<style scoped>
.layout {
    display: flex;
    flex: 1;
    height: 100vh;
    overflow-y: scroll;
}

.layout .content {
    flex: 1;
    background-color: aqua;
}

.a {
    width: 200px;
    height: 2000px;
    background-color: white;
}
</style>