<template>
    <div>
        <div>
            <n-drawer v-model:show="show" display-directive="show" :close-on-esc="false" :width="390"
                :on-mask-click="closeDraw" :mask-closable="true" placement="right">
                <n-drawer-content :native-scrollbar="false">
                    <template #header>
                        <DrawHeader :title="props.title" @close="closeDraw()" />
                    </template>
                    <comp />
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
<script setup lang="ts">
import { DrawHeader } from "@/components";
import Divider from "./component/Divider.vue";
import LabelKey from "./component/LabelKey.vue";
import Title from "./component/Title.vue";
import { DrawContentType } from "../baseTypes";

const props = defineProps<{
    title: string;
    config: DrawContentType[];
    query: Function;
}>();
const emit = defineEmits(["close"]);
const show = ref<boolean>(false);
const list: Record<string, any> = {
    labelKey: LabelKey,
    title: Title,
};
const dividerNode = h(Divider);
let comp = ref(() => h("div", null));

function createContentItem(config: DrawContentType) {
    return h(
        list[config.vnodeName],
        config.vnodeName === "title"
            ? { data: config.data }
            : { config: config },
        { down: () => config.downSolt, right: () => config?.rightSolt }
    );
}
function createContent() {
    const list = props.config.map((item, index) => {
        if (item.vnodeName === 'title' && index !== 0) {
            return [dividerNode, createContentItem(item)]
        }
        return createContentItem(item);
    });
    comp.value = () => h("div", null, list);
}

function showDraw() {
    createContent();
    show.value = true;
}
function closeDraw() {
    show.value = false;
    comp.value = () => h("div", null);
    emit("close");
}
defineExpose({
    showDraw,
});
</script>
<style scoped lang="less">
.btns {
    width: 100%;
    display: flex;
    gap: 4.2rem;
    color: white;
    justify-content: center;

    .pass {
        background: #0083ff;
        border-radius: 4px;
        padding: 9.5px 45px;
        cursor: pointer;
    }

    .refuse {
        background: #f11515;
        border-radius: 4px;
        padding: 9.5px 45px;
        cursor: pointer;
    }
}
</style>
