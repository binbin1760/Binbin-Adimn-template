import { watch, reactive, ref } from "vue";

export function useDataTable(submit: Function, obsKey: string[]) {
  let obsData = reactive({});
  let oldIndex = ref<number>();
  const key = obsKey;
  // 提交请求
  function subData() {
    submit(obsData);
    obsData = {};
  }

  // 计算监视数据
  function getObsData(obs) {
    for (let i = 0; i < key.length; i++) {
      obsData[key[i]] = obs[key[i]];
    }
  }
  // 更新监视数据
  function updateObsData(obs: any, editIndex: number) {
    getObsData(obs);
    oldIndex.value = editIndex;
  }

  watch(oldIndex, (_newval) => {
    subData();
  });
  return {
    updateObsData,
  };
}
