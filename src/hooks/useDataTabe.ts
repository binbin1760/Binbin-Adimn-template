export function useDataTable(submit: Function) {
  //  obsData被监听数据观察者模式
  //  时机：如何判断自动提交时机？ 换行编辑即可提交？还是只关注初始状态和结束状态？
  //  如果用户之编辑一行或者一行都不到的内容如何提交？
  //  多个提交同时进行如何处理任务队列？
  //  异常情况处理？断网？窗口突然关闭？无意的刷新？ 提交or放弃提交？换页？路由跳转？
  let obsData: any;
  let oldIndex: number | null = null;
  let newIndex: number | null = null;
  // 提交请求
  function subData() {
    submit();
    oldIndex = newIndex;
    obsData = null;
  }
  // 提交时机
  if (oldIndex !== newIndex && oldIndex !== null) {
    subData();
  }
  // 监视obs数据变化是否达到自动提交的条件

  // 更新监视数据
  function getObsData(obs: any, editIndex: number | null) {
    newIndex = editIndex;
    obsData = obs; //这里应该直接比较 然后选择是否触发提交
  }

  return {
    getObsData,
  };
}
