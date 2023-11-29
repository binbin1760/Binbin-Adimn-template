<template>
    <div class="gap-1-6">
        <n-space :size="[46, 18]">
            <div class="serch-select" v-for="(item, index) in config" :key="index">
                <div :style="{ width: item.labelwidth }" class="select-label">{{ item.label }}</div>
                <n-select v-if="item.name === 'select'" v-model:value="data[item.keyVal]" :options="item.options" clearable
                    :show-checkmark="false" placeholder="请选择" :style="{ width: '186px' }">
                </n-select>
                <n-input v-if="item.name === 'input'" v-model:value="data[item.keyVal]" clearable :show-checkmark="false"
                    placeholder="请输入" :style="{ width: '186px' }">
                </n-input>
                <DatePickerRange ref="timeRangeRef" v-if="item.name === 'date-range'"
                    @get-time-range="getTimeRange($event, item.keyVal)">
                </DatePickerRange>
            </div>
            <div class="gap-2-8">
                <n-button color="#0091FF" @click="confirmSelect">
                    查询
                </n-button>
                <n-button :bordered="true" text-color="#191919" @click="resetData">
                    重置
                </n-button>
            </div>
        </n-space>
    </div>
</template>
<script setup  lang='ts'>
import { DatePickerRange } from "@/components"

type ConfigType = {
    name: 'input' | 'select' | 'date-range',
    label: string,
    keyVal: string,
    value: any,
    labelwidth?: string,
    options?: Array<Record<string, any>>,
}

const props = defineProps<{
    config: Array<ConfigType>
}>()
const emit = defineEmits(['confirm'])

const { config } = toRefs(props)

const timeRangeRef = ref<any>()
// 数据收集
const dataKey = Object.fromEntries(config.value.map(item => {
    return [item.keyVal, item.value]
}))
const data = ref(dataKey)

function getTimeRange(val, key: string) {
    data.value[key] = val
}

function confirmSelect() {
    emit('confirm', data.value)
}
function resetData() {
    timeRangeRef.value[0].clearDateValue()
    data.value = Object.fromEntries(config.value.map(item => {
        return [item.keyVal, null]
    }))
}
</script>
<style scoped lang='less'>
.gap-1-6 {
    width: 90rem;
    display: flex;
    flex-wrap: wrap;
    gap: 4.6rem;
    align-items: center;
    background-color: white;
}

.gap-2-8 {
    display: flex;
    gap: 2.8rem;
    align-items: center;
}

.serch-select {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.6rem;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    color: #000000;
    line-height: 14px;
    font-weight: 400;
}

.select-label {
    white-space: nowrap;
}
</style>