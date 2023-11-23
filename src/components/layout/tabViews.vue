<template>
  <div class="tab-views">
    <div ref="tagScroll" class="tag-list" @wheel="scrollX">
      <n-dropdown :options="dropOptions" v-for="(item, index) in list" :key="index" :show="showIndex === index"
        @select="selectDropItem($event, index)" @clickoutside="() => (showIndex = undefined)">
        <n-tag size="large" :color="item.fullPath === currentFullpath ? activeColor : tagColor" :bordered="false"
          :closable="!item.meta.affix" @click.right.prevent="rightClick(index)" @close="closeTag(index)"
          @click="toTargetPage(item)">
          {{ item.meta.name }}
        </n-tag>
      </n-dropdown>
    </div>
    <div class="dropMenu"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { tabView, useTabsViewlist } from "@/store/modules/tabsView";
import { whiteList } from "@/router/index";
import {
  ColumnWidthOutlined,
  MinusOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@vicons/antd";

const TabsViewlist = useTabsViewlist();
const Route = useRoute();
const router = useRouter();
const tagScroll = ref<any>(null); //dom
TabsViewlist.initTabs();
const showIndex = ref<number>();
const list = ref<tabView[]>(TabsViewlist.tabViewsList as tabView[]);
const tagColor = {
  color: "white",
  textColor: "black",
};
const activeColor = {
  color: "white",
  textColor: "#409eff",
};
const currentFullpath = ref<string>();
const dropOptions = computed(() => {
  const isDisabled = list.value.length <= 2;
  return [
    {
      label: "关闭左边",
      key: "1",
      disabled: isDisabled,
      icon: () => h(NIcon, null, { default: () => h(ArrowLeftOutlined) }),
    },
    {
      label: "关闭右边",
      key: "2",
      disabled: isDisabled,
      icon: () => h(NIcon, null, { default: () => h(ArrowRightOutlined) }),
    },
    {
      label: "关闭其他",
      key: "3",
      disabled: isDisabled,
      icon: () => h(NIcon, null, { default: () => h(ColumnWidthOutlined) }),
    },
    {
      label: "关闭全部",
      key: "4",
      disabled: list.value.length <= 1,
      icon: () => h(NIcon, null, { default: () => h(MinusOutlined) }),
    },
  ];
});
function toTargetPage(item: tabView) {
  router.push(item.fullPath);
}
function closeTag(index: number) {
  if (Route.fullPath === list?.value[index]?.fullPath) {
    const next = list.value[index - 1].fullPath;
    router.push(next);
  }
  TabsViewlist.delTabitem(index);
}
function rightClick(index: number) {
  showIndex.value = index;
}
function scrollX(event: any) {
  if (event.deltaY > 0) {
    tagScroll.value.scrollLeft += 50;
  } else {
    tagScroll.value.scrollLeft -= 50;
  }
}
function selectDropItem(key: string, index: number) {
  switch (key) {
    case "1":
      TabsViewlist.delLeftitem(index);
      router.push(list.value[index].fullPath);
      list.value = list.value.filter((_item, i) => i >= index || i === 0);
      break;
    case "2":
      TabsViewlist.delRightitem(index);
      router.push(list.value[index].fullPath);
      list.value = list.value.filter((_item, i) => i <= index);
      break;
    case "3":
      TabsViewlist.delOtheritem(index);
      router.push(list.value[index].fullPath);
      list.value = [list.value[0], list.value[index]];
      break;
    case "4":
      TabsViewlist.delAllitem();
      list.value = [list.value[0]];
      router.push(list.value[0].fullPath);
      break;
  }
  showIndex.value = undefined;
}
// 监听路由变化
watch(
  Route,
  (newVal) => {
    const { fullPath, meta, name, query, path, params } = newVal;
    currentFullpath.value = fullPath;
    if (!whiteList.includes(path)) {
      TabsViewlist.addTabitem({ fullPath, meta, name, query, path, params });
    }
    list.value = TabsViewlist.tabViewsList as tabView[];
  },
  { immediate: true }
);
window.addEventListener("beforeunload", () => {
  TabsViewlist.saveTabViewsList();
});
</script>

<style lang="less" scoped>
.tab-views {
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

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
}
</style>
