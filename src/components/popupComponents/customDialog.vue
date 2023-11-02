<template>
    <div class="dialog">
        <div class="mask">
        </div>
        <div class="dialog-main">
            <div class="title">
                {{ props.title }}
            </div>
            <div class="content">
                {{ props.content }}
            </div>
            <div v-if="props.action === null" class="action">
                <NButton type="info">确认</NButton>
                <NButton type="error">取消</NButton>
            </div>
            <div v-else>
                <props.action></props.action>
            </div>
        </div>
    </div>
</template>
<script setup  lang='ts'>
import { VNode } from 'vue';
const props = withDefaults(defineProps<{
    title: string,
    content: any | VNode,
    action?: null | VNode
}>(), {
    title: "确认操作？",
    content: '操作内容！',
    action: null
})
</script>
<style scoped lang='less'>
.dialog {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0, 0, 0, .4);
        top: 0;
        left: 0;
        right: 0;
        left: 0;
        z-index: 1;
    }

    .dialog-main {
        width: 500px;
        background-color: white;
        z-index: 99999;
        padding: 16px;
        border-radius: 12px 8px;

        .action {
            display: flex;
            gap: 15px;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>