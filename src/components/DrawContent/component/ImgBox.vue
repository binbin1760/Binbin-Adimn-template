<template>
    <div class="img">
        <div class="label">{{ props.config.label }}</div>
        <div class="imgList">
            <div class="imgItem" v-for="(item, index) in props.data" :key="index">{{ item }}</div>
        </div>
    </div>
</template>
<script setup  lang='ts'>
import { DrawContentType } from '@/components'
const props = defineProps<{
    config: DrawContentType
    data: string[]
}>()
</script>
<style scoped lang='less'>
.img {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #4D4D4D;
    font-weight: 400;

    .imgList {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;

        .imgItem {
            width: 14rem;
            height: 10.6rem;
            background: #cccc;
        }
    }
}
</style>