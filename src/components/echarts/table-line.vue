<template>
  <div style="height:300%;" :id="this.getId"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "tableDataLine",
  data() {
    return {
      // id: null,
    };
  },
  props: ["getId"],
  mounted() {
    // 数据湖数据监控
    // 本周数据湖数据总量变化图
    draw(this.tableData, this.getId);
    // 数据湖数据总量月变化趋势图
    draw(this.tableData, this.getId);
    // 单表数据总量变化趋势
    draw(this.tableData, this.getId);
    // 单表数据增量变化趋势
    draw(this.tableData, this.getId);

    //  核心数据库数据监控
    // 本周核心数据库数据总量变化图
    draw(this.tableData, this.getId);
    // 核心数据库数据总量月变化趋势图
    draw(this.tableData, this.getId);
    // 核心库单表数据总量变化趋势
    draw(this.tableData, this.getId);
    // 核心库表数据增量变化趋势
    draw(this.tableData, this.getId);

    //   数据关联信息监控
    // 关联信息总量变化趋势
    draw(this.tableData, this.getId);
    // 单表关联信息总量变化趋势
    draw(this.tableData, this.getId);
    // 单表关联信息增量变化趋势 
    draw(this.tableData, this.getId);

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
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}"
      }
    },
    series: [
      {
        name: "最高数据",
        type: "line",
        data: [11, 11, 15, 13, 12, 13, 20],
        itemStyle: {
          color: "#6ED6D7"
        },
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "平均值" }]
        }
      }
    ],
    animation: false
  };
  dataSourcePie.setOption(option);
  window.addEventListener("resize", function() {
    dataSourcePie.resize();
  });
}
</script>
