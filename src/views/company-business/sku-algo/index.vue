<template>
<div class="sku">
    <div class="attribute" v-for="(item,index) in options" :key="index" >
        <CustomSelect :options="item" @update:value="getSelectVal"></CustomSelect>
    </div>
</div>
</template>
<script setup  lang='ts'>
import { CustomSelect } from "@/components";

type productionInfo={
    title: string,
    isAddImg: boolean,
    values: Array<{attr:string,img?:string}>
}

const attrs = ref<Array<productionInfo>>([
    {
        title: 'sku-1',
        isAddImg: true,
        values: [
            { attr: 'v1', img: 'img1' },
            { attr: 'v2', img: 'img2' },
            { attr: 'v3', img: 'img3' },
            { attr: 'v4', img: 'img4' },
        ]
    },
    {
        title: 'sku-2',
        isAddImg: false,
        values: [
            { attr: 'x1' },
            { attr: 'x2' },
            { attr: 'x3' },
        ]
    },
    {
        title: 'sku-3',
        isAddImg: false,
        values: [
            { attr: 'd1' },
            { attr: 'd2' },
            { attr: 'd3' },
            { attr: 'd4' },
            { attr: 'd5' },
        ]
    }
])
const options = attrs.value.map(item => { 
    return item.values.map(it => { 
        return { label:it.attr,value:it.attr }
    })
})
const selecrArr=ref<Array<any>>([])
function getSelectVal(e) { 
    selecrArr.value?.push(e)
}
// function computedSkuList(pro: Array<productionInfo>) { 
//     let  resArr:any[]=[]
//     const options=pro.map(item=>item.values)
// }
</script>
<style scoped lang='less'>
.sku{
    width: 100%;
    height: 100%;
    background:white;
    padding: 1.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.attribute{
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.sku-img{
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 12px;
    font-size: 12px;
}
</style>