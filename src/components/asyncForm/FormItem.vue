<template></template>
<script lang='ts'>
import { FormItemType } from './types'
import { comp } from './componentList'
import { inject } from 'vue'

export default defineComponent({
    name: 'async-form-item',
    props: {
        config: {
            type: Object as PropType<FormItemType>,
        },
    },
    setup(props) {
        const config = ref(props.config)
        const compoentItem = comp.get(config.value?.componentName)
        const inpuVal=ref(props.config?.value)
        const formData= inject('formData') as any
        return () => h(compoentItem, {
            value: inpuVal.value,
            placeholder: config.value?.placeholder,
            onUpdateValue: (val) => {
                inpuVal.value = val
                formData[config.value!.keyVal]=val
            },
            options:config.value?.options
        })
    },
})
</script>
<style scoped lang='less'></style>