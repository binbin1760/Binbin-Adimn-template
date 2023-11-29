<template>
    <div>
        <DrawContent ref="DrawRef" title="测试query" :query="testAsyncDraw"></DrawContent>
        <NButton type="info" @click="openDraw">打开Draw</NButton>
    </div>
</template>
<script setup  lang='ts'>
import { testAsyncDraw } from '@/api'
import { DrawContent } from '@/components';

const DrawRef = ref<any>()
function openDraw() {
    DrawRef.value.showDraw()
}
</script>
<style scoped lang='less'></style>