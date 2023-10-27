import { nextTick, unref } from "vue";
// 按需引入需要的模块
import * as echarts from "echarts/core";
import { BarChart, PieChart } from "echarts/charts";
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts";
// TS类型相关模块
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";
// 布局动画模块
import { LabelLayout, UniversalTransition } from "echarts/features";
// 渲染器
import { CanvasRenderer } from "echarts/renderers";
import { ComposeOption } from "echarts";
// 组件注册
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
]);
// option配置项类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | PieSeriesOption
>;
// 小贴士：在容器节点被销毁时，总是应调用 echartsInstance.dispose 以销毁实例释放资源，避免内存泄漏。
export function useEchart(elRef: Ref<HTMLDivElement>) {
  let chartsInstance: echarts.ECharts | null = null;
  // 初始化echarts
  const initEchart = () => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartsInstance = echarts.init(el);
  };
  // 更新/设置配置
  const unpdateOption = (option) => {
    nextTick(() => {
      if (!chartsInstance) {
        initEchart();
        if (!chartsInstance) return;
      }
      chartsInstance.setOption(option);
    });
  };
  // 盒子大小监听
  function resize() {
    chartsInstance?.resize();
  }
  return {
    unpdateOption,
    resize,
  };
}
