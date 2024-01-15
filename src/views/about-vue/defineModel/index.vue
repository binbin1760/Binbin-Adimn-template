<template>
<div>
    <div>Vue3.4版本新增稳定API：defineModel</div>
    <div>
        <children v-model="childrenValue"/>
    </div>
    <div>父组件传递值：{{ childrenValue }}</div>
    <n-button type="info" @click="changeVal">改变vomodel传递的值</n-button>
</div>
</template>
<script setup  lang='ts'>
import { ref } from 'vue';
import children from './components/children.vue';
const childrenValue = ref('绑定值')
function changeVal() {
    childrenValue.value='改变了'
}
</script>
<style scoped lang='less'>
</style>