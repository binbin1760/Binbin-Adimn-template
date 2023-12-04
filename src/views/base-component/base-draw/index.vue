<template>
    <div>
        <DrawContent :config="config" ref="DrawRef" title="测试query" :query="testAsyncDraw"></DrawContent>
        <NButton type="info" @click="openDraw">打开Draw</NButton>
    </div>
</template>
<script setup  lang='ts'>
import { testAsyncDraw } from '@/api'
import { DrawContent, DrawContentType } from '@/components';

const DrawRef = ref<any>()
const config = ref<DrawContentType[]>([
    {
        data: '名称',
        vnodeName: 'title',
    },
    {
        keyVal: 'name',
        label: '测试label：',
        data: '',
        vnodeName: 'labelKey',
        weight: '400',
        textcolor: 'red',
        rightSolt: h('div', null, { default: () => '自定义label右侧显示' })
    },
    {
        keyVal: 'age',
        label: '测试label：',
        data: '值2',
        vnodeName: 'labelKey',
        weight: '400'
    },
    {
        data: '名称',
        vnodeName: 'title',
    },
    {
        keyVal: 'col',
        label: '测试label：',
        data: '值3',
        vnodeName: 'labelKey',
        weight: '400'
    },
    {
        keyVal: 'cool',
        label: '测试label：',
        data: '值4',
        vnodeName: 'labelKey',
        weight: '400'
    },
    {
        keyVal: 'time',
        label: '测试label：',
        data: '值5',
        vnodeName: 'labelKey',
        weight: '400'
    },
    {
        data: '名称',
        vnodeName: 'title',
    },
    {
        keyVal: 'max',
        label: '测试label：',
        data: '值6',
        vnodeName: 'labelKey',
        weight: '400',
    },
    {
        keyVal: 'min',
        label: '测试label：',
        data: '值6',
        vnodeName: 'labelKey',
        weight: '400',
        downSolt: h('div', null, '插槽')
    },
])
function openDraw() {
    DrawRef.value.showDraw()
}
</script>
<style scoped lang='less'></style>