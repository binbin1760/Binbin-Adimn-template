<template>
    <div>
        <div>
            <n-drawer v-model:show="show" display-directive="show" :close-on-esc="false" :width="390"
                :on-mask-click="closeDraw" :mask-closable="true" placement="right">
                <n-drawer-content :native-scrollbar="false">
                    <template #header>
                        <DrawHeader :title="props.title" @close="closeDraw()" />
                    </template>
                    <div id="content">
                        <comp />
                    </div>
                    <template #footer>
                        <div class="btns">
                            <div class="pass">通过</div>
                            <div class="refuse">拒绝</div>
                        </div>
                    </template>
                </n-drawer-content>
            </n-drawer>
        </div>
    </div>
</template>
<script setup  lang='ts'>
import { DrawHeader } from "@/components"
import Divider from "./component/Divider.vue";
import ImgBox from "./component/ImgBox.vue";
import LabelKey from "./component/LabelKey.vue";
import Title from "./component/Title.vue";

const props = defineProps<{
    title: string,
    query: Function,
}>()
const emit = defineEmits(['close'])
const show = ref<boolean>(false)
const { query } = props

const list = {
    divider: Divider,
    imgBox: ImgBox,
    labelKey: LabelKey,
    title: Title
}


let comp: any
function createContentItem(config: any) {
    return h(list[config.vnodeName], { config: config, data: config.data })
}

async function createContent() {
    const result = await query()
    const list = JSON.parse(result).data.map(item => {
        return createContentItem(item)
    })
    comp = () => h('div', null, list)
}
createContent()
function showDraw() {

    show.value = true
}
function closeDraw() {
    show.value = false
    emit('close')
}
defineExpose({
    showDraw
})

</script>
<style scoped lang='less'>
.btns {
    width: 100%;
    display: flex;
    gap: 4.2rem;
    color: white;
    justify-content: center;

    .pass {
        background: #0083FF;
        border-radius: 4px;
        padding: 9.5px 45px;
        cursor: pointer;
    }

    .refuse {
        background: #F11515;
        border-radius: 4px;
        padding: 9.5px 45px;
        cursor: pointer;
    }
}
</style>