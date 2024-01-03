<template>
<n-space :size="12">
    <div 
    v-for="(item, index) in props.options" 
    :class="selectedVal===item.value?'selected':'select'"  
    :key="index"
    @click="getSelect(item)"
    > 
        {{ item.label }}
    </div>    
</n-space>
</template>
<script setup  lang='ts'>
const props = defineProps<{
    options: Array<{ label: string, value: any }>,
    value?:number
}>()
const emit=defineEmits(['update:value'])
const selectedVal = ref<any>(props.value)
function getSelect(item) { 
    selectedVal.value = item.value
    emit('update:value',item.value)
}
</script>
<style scoped lang='less'>
.select{
    padding: 2px 8px ;
    background-color: #f4f4f5;
    border: 1px solid #f4f4f5;
    cursor: pointer;
}
.selected{
    padding: 2px 8px ;
    background-color: #f4f4f5;
    border: 1px solid #409EFF;
    cursor: pointer;
}
</style>