<template>
  <div class="tab-views">
    <div class="leftout" @click="leftScroll">
      <NIcon size="large">
        <LeftOutlined />
      </NIcon>
    </div>
    <div ref="tagScroll" class="tag-list" @wheel="scrollX">
      <n-tag
        size="large"
        :color="item.fullPath === currentFullpath ? activeColor : tagColor"
        :bordered="false"
        v-for="(item, index) in list"
        :key="index"
        :closable="!item.meta.affix"
        @close="closeTag(index)"
        @click="toTargetPage(item)"
        >{{ item.meta.name }}</n-tag
      >
    </div>
    <div class="rightout">
      <NIcon size="large">
        <RightOutlined />
      </NIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { tabView, useTabsViewlist } from "@/store/modules/tabsView";
import { RightOutlined, LeftOutlined } from "@vicons/antd";

const TabsViewlist = useTabsViewlist();
const Route = useRoute();
const router = useRouter();
const tagScroll = ref<any>(null); //dom
TabsViewlist.initTabs();
const list: tabView[] = TabsViewlist.tabViewsList as tabView[];
const tagColor = {
  color: "white",
  textColor: "black",
};
const activeColor = {
  color: "white",
  textColor: "#409eff",
};
const currentFullpath = ref<string>();
function toTargetPage(item: tabView) {
  router.push(item.fullPath);
}
function closeTag(index: number) {
  if (Route.fullPath === list[index]?.fullPath) {
    const next = list[index - 1].fullPath;
    router.push(next);
  }
  TabsViewlist.delTabitem(index);
}

function leftScroll() {
  console.log(tagScroll);
}
function scrollX(event: any) {
  if (event.deltaY > 0) {
    tagScroll.value.scrollLeft += 50;
  } else {
    tagScroll.value.scrollLeft -= 50;
  }
}
// 监听路由变化
watch(
  Route,
  (newVal) => {
    const { fullPath, meta, name, query, path, params } = newVal;
    currentFullpath.value = fullPath;
    if (meta.name !== "登录") {
      TabsViewlist.addTabitem({ fullPath, meta, name, query, path, params });
    }
  },
  { immediate: true }
);
window.addEventListener("beforeunload", () => {
  TabsViewlist.saveTabViewsList();
});
// window.addEventListener("wheel", scrollX);
</script>

<style lang="less" scoped>
.tab-views {
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  .leftout {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .tag-list {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: scroll;
  }
  .tag-list::-webkit-scrollbar {
    display: none;
  }
  .rightout {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
