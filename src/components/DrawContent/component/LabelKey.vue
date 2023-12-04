<template>
    <div class="label-value-box">
        <div class="label-value">
            <div class="label">{{ props.config.label }}</div>
            <div v-if="props.config.data" class="value" :style="style">{{ props.config.data }}</div>
            <slot name="right"></slot>
        </div>
        <slot name="down"></slot>
    </div>
</template>
<script setup  lang='ts'>
import { DrawContentType } from '@/components'
const props = defineProps<{
    config: DrawContentType
}>()

const { textcolor, weight } = props.config
const style = {
    color: textcolor ? textcolor : '#000000',
    fontWeight: weight
}

</script>
<style scoped lang='less'>
.label-value {
    display: flex;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    margin-top: 1.2rem;

    .label {
        color: #4D4D4D;
        font-weight: 400;
        white-space: nowrap;
    }

    .value {
        color: #000000;
        white-space: wrap;
        padding-right: 12px;
    }
}
</style>