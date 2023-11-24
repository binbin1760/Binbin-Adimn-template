<template>
    <div class="crud">
        <!-- 需求分析 -->
        <!-- 1.不同间距  每一行的组件 间距需要动态设置 -->
        <!-- 2.换行  一行一行渲染不设置 flex column-->
    </div>
</template>
<script  lang='ts'>
// import { creatRow } from './utils'
import { PropType } from 'vue';

/***
 * cellGap  每一行元素的样式
 * gap： 相邻两行的上下间距
 * config: 组件配置   Array<Record<string,any>>
 */


export default defineComponent({
    name: 'async-head',
    props: {
        cellGap: {
            type: Array as PropType<string[]>,
            required: true
        },
        config: {
            type: Array as PropType<Array<Array<Record<string, any>>>>, //肯定是一个二维数组, [ [{}],[{}],[{}]] 
            required: true
        },
        gap: {
            type: String as PropType<string>,
            required: false
        }
    },
    // setup(props) {
    //     const { cellGap, config, gap } = toRefs(props)
    //     const RowList = config.value.map(item => {
    //         return creatRow(item)
    //     })
    // },
})
</script>
<style scoped lang='less'>
.crud {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}
</style>