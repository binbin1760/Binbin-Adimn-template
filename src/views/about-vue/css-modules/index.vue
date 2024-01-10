<template>
<div>
    单文件CSS功能
    <children>
        <div>
            插槽使用 slotted
        </div>
    </children>
    <div class="text" >
        css 使用 v-bind: 可以使用事件动态改变颜色,但无法导入整个CSS对象
        <n-button type="info" @click="changeColor()">改变颜色</n-button>
        <div class="text2">
            使用v-bind动态绑定的CSS属性，最终会被以Style属性的样式挂载到组件的根节点上
        </div>
    </div>
</div>
</template>
<script setup  lang='ts'>
import children from './components/children.vue';
let color = ref('red')
function changeColor() { 
    color.value='aqua'
}
</script>
<style scoped lang='less'>
.text{
    color:v-bind(color);
    cursor: pointer;
}
.text2{
    color:#000000;
}
</style>