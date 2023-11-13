export function useDataTable(
  obsData: any,
  submit: Function,
  editIndex: number
) {
  //  obsData被监听数据观察者模式
  //  时机：如何判断自动提交时机？ 换行编辑即可提交？还是只关注初始状态和结束状态？
  //  如果用户之编辑一行或者一行都不到的内容如何提交？
  //  多个提交同时进行如何处理任务队列？
  //  异常情况处理？断网？窗口突然关闭？无意的刷新？ 提交or放弃提交？换页？路由跳转？
}
