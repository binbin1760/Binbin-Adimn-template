<template>
    <div class="title">
        {{ props?.data }}
    </div>
</template>
<script setup  lang='ts'>
const props = defineProps<{
    data: string
}>()
</script>
<style scoped lang='less'>
.title {
    font-family: 'PingFangSC-Medium';
    font-size: 14px;
    color: #030303;
    font-weight: 500;
}
</style>