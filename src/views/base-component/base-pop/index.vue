<template>
    <div class="base-pop">
        <n-card title="组件需求说明">
            <div> 1.是否需要遮盖侧栏菜单，如果不遮盖侧栏菜单那是否需要考虑缓存当前页面团床问题</div>
            <div> 2.自动销毁，避免内存泄漏</div>
            <div> 3.函数式调用</div>
            <div> 4.可以通过传入VNode参数的形势来，动态指定渲染的组件。 从而达到超高度的样式定制化</div>
            <div> 5.一个小小的细节，通过插入节点和销毁节点的时候要注意页面的复杂度，避免不必要的重构和重绘造成性能损失</div>
        </n-card>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
}
</style>