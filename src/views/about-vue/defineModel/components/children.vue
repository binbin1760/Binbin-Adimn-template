<template>
<div>
    <div>v-model值：{{ value }}</div>
    <n-button type="info" @click="changeVal">子组件内部更改</n-button>
</div>
</template>
<script setup  lang='ts'>
const value = defineModel<string>()
function changeVal() {
    console.log(value.value)
    value.value='子组件改变'
}
</script>
<style scoped lang='less'>
</style>