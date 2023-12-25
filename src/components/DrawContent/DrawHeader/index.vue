<template>
    <div class="headerBox">
        <div class="left">
            <div class="x-divider"></div>
            <div class="title">{{ props.title }}</div>
        </div>
        <div class="closeIcon" @click="closeDraw()">
            x
        </div>
    </div>
</template>
<script setup  lang='ts'>
const props = defineProps<{
    title: string
}>()
const emit = defineEmits(['close'])
function closeDraw() {
    emit('close')
}
</script>
<style scoped lang='less'>
.headerBox {
    width: 342px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'PingFangSC-Medium';
    font-size: 16px;
    color: #2B2828;
    font-weight: 500;
    gap: 0.8rem;
    flex: 1;
    background-color: white;

    .left {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .x-divider {
        width: 2px;
        height: 14px;
        background: #0083FF;
    }

    .title {
        text-wrap: nowrap;
        white-space: nowrap;
    }

    .closeIcon {
        cursor: pointer;
    }
}
</style>