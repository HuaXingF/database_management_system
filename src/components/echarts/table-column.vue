<template>
  <div style="height:300%;" :id="this.getId"></div>
</template>

<script>
const echarts = require("echarts");
export default {
    name: 'tableDataColumn',
  data() {
    return {
      // id: null,
    };
  },
  props: ["getId"],
  mounted() {
    // 当前各表据关联总量排行榜
    if(this.getId == 'columnAssAll') {
        draw1(this.tableData, this.getId);
    } else {
        draw(this.tableData, this.getId);
    }
  }
  // watch:{
  //     tableData(val){
  //         draw(val);
  //     }
  // }
};
function draw(tableData, id) {
  let dataSourcePie = echarts.init(document.getElementById(id));
  let legentData = [];
  let seriesData = [];
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: [
      {
        type: "category",
        data: [
          "电子病历",
          "健康档案",
          "全员人口",
          "公卫",
          "基础信息",
          "门诊记录"
        ]
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "联盟广告",
        type: "bar",
        stack: "广告",
        label: {
          normal: {
            show: true,
            position: ["40%", 10],
            color: "#fff"
          }
        },
        data: [220, 182, 191, 234, 290, 330]
      },
      {
        name: "邮件营销",
        type: "bar",
        stack: "广告",
        label: {
          normal: {
            show: true,
            position: "top"
          }
        },
        data: [120, 132, 101, 134, 90, 230]
      }
    ],
    animation: false,
  };
  dataSourcePie.setOption(option);
  window.addEventListener("resize", function() {
    dataSourcePie.resize();
  });
}
function draw1(tableData, id) {
  let dataSourcePie = echarts.init(document.getElementById(id));
  let legentData = [];
  let seriesData = [];
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: [
      {
        type: "category",
        data: [
          "电子病历",
          "健康档案",
          "全员人口",
          "公卫",
          "基础信息",
          "门诊记录"
        ]
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "联盟广告",
        type: "bar",
        stack: "广告",
        itemStyle: {
            color: "#96A7B7"
        },
        label: {
          normal: {
            show: true,
            position: ["40%", 10],
            color: "#fff"
          }
        },
        data: [220, 182, 191, 234, 290, 330]
      },
    ],
    animation: false,
  };
  dataSourcePie.setOption(option);
  window.addEventListener("resize", function() {
    dataSourcePie.resize();
  });
}
</script>
