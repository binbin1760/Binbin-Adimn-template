<template>
<n-radio-group v-model:value="inputVal" @update-value="change">
    <n-space>
        <n-radio v-for="item in options" :key="item.value" :value="item.value">
            {{ item.label }}
        </n-radio>
    </n-space>
</n-radio-group>
</template>
<script setup  lang='ts'>
const props = defineProps<{
    value: any
    options:Record<string,any>
}>()
const emit=defineEmits(['UpdateValue'])
const inputVal = ref(props.value)
const options = ref(props.options)
function change(val) {
    emit('UpdateValue', val)
}
</script>
<style scoped lang='less'>
</style>