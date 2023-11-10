/***
 * 1.表格的空间意义，他其实是一行一行堆砌起来的，没有列的说法
 *   第一行   [1,2,3]
 *   第二行   [2,2,3]
 *   第三行   [3,2,3]
 * 所以无法直接获取某一列的全部数据，只能先获取行，再获取列即(x,y)
 *
 * 2.所有拖拽的实现必不可能直接获取某一列来拖拽，只能是：
 * 选中某一列————>生成一个新的列表装载数据----->删除选中的列——————>到达目标列————————>获取目标列的数据并计算————————>融合/其他操作
 *
 * 3.所有计算围绕表格组件的data属性进行
 */

// 获取目标列的值
function getColumn(data: Array<any>, xindex: number) {
  return data.filter((_item, index) => index === xindex);
}
// 创建载体
function createCarryBox() {}
// 删除选中的列
function delColumnSet(column: Array<any>, index: number) {
  return column.splice(index, 0);
}
// 获取目标列的数据并计算
function computedData(data: Array<any>, target: Array<any>) {
  return data.map((item, index) => {
    return item + target[index];
  });
}

// 其他操作
