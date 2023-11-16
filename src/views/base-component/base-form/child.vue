<template>
    <div>
        <span>这是子组件</span><n-input v-model:value="inputVal"></n-input>
    </div>
</template>
<script setup  lang='ts'>
import { inject } from 'vue'
const value = inject('message')
const inputVal = ref<any>(value)
</script>
<style scoped lang='less'></style>