<template>
  <n-config-provider abstract :theme-overrides="tabeOverrides">
    <div class="data-table">
      <div class="table-set">
        <div>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon size="24">
                <QuestionCircleOutlined />
              </n-icon>
            </template>
            所有设置项，刷新后会恢复原样
          </n-tooltip>
        </div>
        <div class="set-icon">
          <div class="color-picker" v-if="isStriped">
            <div>自定义斑马线颜色：</div>
            <NColorPicker
              v-model:value="stripedColor"
              :show-alpha="false"
              size="small"
            ></NColorPicker>
          </div>
          <n-dropdown :options="options" @select="getSelect">
            <n-icon size="24">
              <SettingsSharp />
            </n-icon>
          </n-dropdown>
        </div>
      </div>
      <n-data-table
        ref="tabeRef"
        class="n-data-table"
        :columns="column"
        :data="props.data"
        :bordered="true"
        flex-height
        :striped="isStriped"
        pagination-behavior-on-filter="current"
        @update-checked-row-keys="handleCheck"
      />
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { type DataTableRowKey, DataTableProps, NColorPicker } from "naive-ui";
import { SettingsSharp } from "@vicons/ionicons5";
import { QuestionCircleOutlined } from "@vicons/antd";
interface props {
  columns?: Required<DataTableProps>["columns"];
  horizontalScroll?: boolean;
  data: any;
}
const props = defineProps<props>();
const emit = defineEmits(["getRowKey"]);
const options = [
  { label: "开启斑马纹", key: "type1" },
  { label: "显示序号", key: "type3" },
];
const tabeRef = ref<any>();
const isStriped = ref<boolean>(false);
const showIndex = ref<boolean>(false);
const stripedColor = ref<string>("#268AD2");
// 设置-->下拉菜单
const map = {
  type1: () => {
    isStriped.value = !isStriped.value;
  },
  type3: () => {
    showIndex.value = !showIndex.value;
  },
};
function getSelect(e: string) {
  map[e]();
}
function handleCheck(rowKeys: DataTableRowKey[]) {
  emit("getRowKey", rowKeys);
}
//设置-->是否显示序号
const column = computed(() => {
  if (!showIndex.value) {
    const isExist = props.columns?.some((item: any) => item.title === "序号");
    if (isExist) {
      props.columns?.shift();
    }
  }
  if (showIndex.value) {
    props.columns?.unshift({
      title: "序号",
      key: "",
      align: "center",
      render: (_row, index) => {
        return h("span", {}, { default: () => index + 1 });
      },
    });
  }
  return props.columns;
});
// 主题-->设置斑马线颜色
const tabeOverrides = computed(() => {
  return {
    DataTable: {
      tdColorStriped: stripedColor.value,
    },
  };
});
// 设置-->开启右键编辑
</script>
<style></style>
<style scoped lang="less">
.data-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-set {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .set-icon {
    display: flex;
    gap: 1.6rem;
    align-items: center;
    font-size: 12px;
    .color-picker {
      width: 28rem;
      display: flex;
      align-items: center;
      div {
        text-wrap: nowrap;
      }
    }
  }
  .n-data-table {
    flex: 1;
    border-radius: 5px;
    overflow: hidden;
    --n-merged-th-color: #fafafc;
  }
}
</style>
