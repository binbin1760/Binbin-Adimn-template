<template>
  <div class="console">
    <div>
      <div>分散管理数据</div>
      <div ref="myEchart1" :style="{ height: '300px', width: '600px' }"></div>
    </div>
    <div>
      <div>集中管理数据</div>
      <div ref="myEchart2" :style="{ height: '300px', width: '600px' }"></div>
    </div>
    <div>
      <div>维度数据映射</div>
      <div ref="myEchart3" :style="{ height: '300px', width: '600px' }"></div>
    </div>
    <div>
      <div>数据到图形的映射</div>
      <div ref="myEchart4" :style="{ height: '300px', width: '600px' }"></div>
    </div>
    <div>
      <div>数据转换 取一组数据出来做扇形图</div>
      <div ref="myEchart5" :style="{ height: '300px', width: '1300px' }"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useEchart, ECOption } from "@/hooks";
const myEchart1 = ref<any>(null);
const myEchart2 = ref<any>(null);
const myEchart3 = ref<any>(null);
const myEchart4 = ref<any>(null);
const myEchart5 = ref<any>(null);
// series
const option1: ECOption = {
  legend: {},
  xAxis: {
    type: "category",
    data: ["数据分散管理1", "数据分散管理2", "数据分散管理3", "数据分散管理4"],
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      name: "2015",
      data: [89.3, 92.1, 94.4, 85.4],
    },
    {
      type: "bar",
      name: "2016",
      data: [95.8, 89.4, 91.2, 76.9],
    },
    {
      type: "bar",
      name: "2017",
      data: [97.7, 83.1, 92.5, 78.1],
    },
  ],
};
// dataset  映射
const option2: ECOption = {
  legend: {}, //控制显示系列中每一列显示的组件
  tooltip: {},
  dataset: {
    source: [
      ["product", "第一列红色", "第二列分红", "第三列蓝色"],
      ["集中管理数据1", 43.3, 85.8, 93.7],
      ["集中管理数据2", 83.1, 73.4, 55.1],
      ["集中管理数据3", 86.4, 65.2, 82.5],
      ["集中管理数据4", 72.4, 53.9, 39.1],
    ],
  },
  xAxis: {
    type: "category",
  },
  yAxis: {},
  series: [
    // 对应第一列
    {
      type: "bar",
      color: "red", //柱状图 柱子颜色设置
    },
    // 对应第二列
    {
      type: "bar",
      color: "pink",
    },
    // 对应第三列
    {
      type: "bar",
      color: "blue",
    },
  ],
};
// dataset 维度
const option3: ECOption = {
  legend: {}, //控制显示系列中每一列显示的组件
  tooltip: {},
  dataset: {
    // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
    // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
    // 如果不指定 dimensions，也可以通过指定 series.encode
    dimensions: [{ name: "product" }, "2015", "2016", "2017"],
    source: [
      { product: "维度1", "2015": 43.3, "2016": 85.8, "2017": 63 },
      { product: "维度2", "2015": 12.5, "2016": 66, "2017": 23 },
      { product: "维度3", "2015": 43, "2016": 77, "2017": 52 },
      { product: "维度4", "2015": 33, "2016": 88, "2017": 15 },
    ],
  },
  xAxis: {
    type: "category",
  },
  yAxis: {},
  series: [
    // 对应第一列
    {
      type: "bar",
      color: "red", //柱状图 柱子颜色设置
    },
    // 对应第二列
    {
      type: "bar",
      color: "pink",
    },
    // 对应第三列
    {
      type: "bar",
      color: "blue",
    },
  ],
};
// 数据到图形的映射
const option4: ECOption = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ["score", "amount", "product"],
      [89.3, 58212, "数据1"],
      [57.1, 78254, "数据2"],
      [74.4, 41032, "数据3"],
      [50.1, 12755, "数据4"],
      [89.7, 20145, "数据5"],
      [68.1, 79146, "数据6"],
      [19.6, 91852, "数据7"],
      [10.6, 101852, "数据8"],
      [32.7, 20112, "数据9"],
    ],
  },
  xAxis: {},
  yAxis: {
    type: "category",
  },
  series: [
    {
      type: "bar",
      color: "purple",
      encode: {
        x: "amount",
        y: "product",
      },
    },
  ],
};
const option5: ECOption = {
  tooltip: {},
  dataset: [
    {
      source: [
        ["product", "amount", "score"],
        ["数据1", 8000, "12"],
        ["数据2", 16000, "12"],
        ["数据3", 6000, "12"],
        ["数据4", 5000, "11"],
        ["数据5", 4000, "11"],
        ["数据6", 13000, "11"],
        ["数据7", 13000, "15"],
        ["数据8", 4500, "15"],
        ["数据9", 1000, "15"],
      ],
    },
    {
      transform: {
        type: "filter",
        config: { dimension: "score", value: 12 },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: "score", value: 11 },
      },
    },
    {
      transform: {
        type: "filter",
        config: { dimension: "score", value: 15 },
      },
    },
  ],
  series: [
    {
      type: "pie",
      center: ["25%", "50%"],
      datasetIndex: 1,
    },
    {
      type: "pie",
      center: ["50%", "50%"],
      datasetIndex: 2,
    },
    {
      type: "pie",
      center: ["75%", "50%"],
      datasetIndex: 3,
    },
  ],
};
// 数据转换
const echart1 = useEchart(myEchart1);
const echart2 = useEchart(myEchart2);
const echart3 = useEchart(myEchart3);
const echart4 = useEchart(myEchart4);
const echart5 = useEchart(myEchart5);
echart1.unpdateOption(option1);
echart2.unpdateOption(option2);
echart3.unpdateOption(option3);
echart4.unpdateOption(option4);
echart5.unpdateOption(option5);
</script>
<style scoped lang="less">
.console {
  height: 100%;
  border-radius: 0.8rem;
  background-color: @bg;
  padding: 1rem;
  font-size: 1.6rem;
  display: flex;
  flex-wrap: wrap;
}
</style>
