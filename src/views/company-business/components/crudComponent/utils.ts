/***
 * 参数说明:
 *  {
 *    componentName:组件名称 string
 *    props:组件参数   Record<string ,any>
 *    label:组件label  string,
 *    valKey:数据收集的key string
 *  }
 *
 */
export type RowCell = {
  componentName: string;
  props: Record<string, any>;
  label: string;
  valKey: string;
};

import { NInput, NSelect, NButton } from "naive-ui";

const componentList = {
  input: NInput,
  select: NSelect,
  button: NButton,
};

function getComponent(key: string) {
  return componentList[key];
}
// 生成rowCell
export function processComponent(obj: RowCell) {
  const { componentName, props, label } = obj;

  const labelBox = h("div", null, { default: () => label });
  const targetComponent = h(getComponent(componentName), { ...props });

  return h("div", { style: { display: "flex", alignItems: "center" } }, [
    labelBox,
    targetComponent,
  ]);
}
// 生成row
export function creatRow(obj: Array<RowCell>) {
  const list = obj.map((item) => {
    return processComponent(item);
  });
  return h("div", null, list);
}
