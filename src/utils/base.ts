// 常用的基础方法

//将数组中的某两项组合成为一个对象数组并返回
export function pickerArray2toObj(
  Arr: Array<Record<string, string>>,
  option1: string,
  option2: string
) {
  const temp = Arr.map((item) => {
    return [item[option1], item[option2]];
  });
  return Object.fromEntries(temp);
}
