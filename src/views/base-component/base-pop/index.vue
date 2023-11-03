<template>
    <div class="base-pop">
        <NButton type="info" @click="initPop()">启动自定义弹出</NButton>
    </div>
</template>
<script setup lang='ts'>
import { useMyDialog } from '@/hooks'
const { initPop } = useMyDialog()
</script>
<style scoped lang='less'>
.base-pop {
    height: 100%;
    flex: 1;
    padding: 1.6rem;
    background-color: white;
}
</style>