<template>
  <div style="height:300%;" :id="getId" :tableData="tableData"></div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "tableDataPie",
  data() {
    return {
      // id: null,
      getPieData: null
    };
  },
  created() {},
  mounted() {
    this.draw(this.getPieData,this.getId);
    // this.tableData = JSON.stringify(localStorage.getItem("getTable"))
    // this.getPieData = JSON.parse(localStorage.getItem("getData"))
    // console.log(this.getPieData);

  },
  methods: {
    draw(getPieData,id) {
      let dataSourcePie = echarts.init(document.getElementById(id));
      let legentData = [];
      let seriesData = [];
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "数据来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ],
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    }
  },
  watch: {
    tableData: {
      handler(newValue,oldValue) {
        this.draw(this.getId);
      },
      deep: true
    }
  },
  props: ["getId", "tableData"]
  // watch:{
  //     tableData(val){
  //         draw(val);
  //     }
  // }
};
</script>
