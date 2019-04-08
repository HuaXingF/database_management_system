<template>
  <el-col :span="24" class="system-setting">
    <MTopNav>
      <template slot="pageName">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <i class="fa fa-home"></i>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template slot="operation"></template>
    </MTopNav>
    <!-- 常规表 -->
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>数据湖当前数据统计</p>
        <div id="container-column1" style="height: 300%" ref="getCloumn1"></div>
      </el-col>
      <el-col :sm="12">
        <p>核心数据库当前数据统计</p>
        <div id="container-column2" style="height: 300%" ref="getCloumn2"></div>
      </el-col>
    </el-row>
    <!-- echarts图表 -->
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>当前ETL流程状态分布统计</p>
        <div id="container-circle" style="height: 300%" ref="getCircle"></div>
      </el-col>
      <el-col :sm="12">
        <p>当前各库数据合格率统计</p>
        <div id="container-column" style="height: 300%" ref="getCloumn"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <!-- 当前关联信息统计 -->
      <el-col :sm="12">
        <p>当前关联信息统计</p>
        <div id="container-gitGuanLian" style="height: 300%" ref="gitGuanLian"></div>
      </el-col>
      <!-- 当前总关联成功比例 -->
      <el-col :sm="12">
        <p>当前总关联成功比例</p>
        <!--<div id="container-getAllTab" style="height: 300%" ref="getAllTab"></div>-->
        <div id="lineMonthData" style="height: 300%" ref="getLineMonthData"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import {
  select_guanlian,
  select_shujuku,
  select_shujuhu,
  select_containerCircle,
  select_hegelu,
  select_conGetAllTab
} from "@/api/system-setting";
export default {
  name: "systemSetting",
  data() {
    return {
      //   containerCircle: "containerCircle",
      //   containerColumn: "containerColumn",
      tableData: [],
      tableData1: [] //核心数据库当前数据统计
      //tableData2: [ ]//当前关联信息统计
    };
  },
  mounted() {
    //console.log(this.$refs.getCloumn);
    this.containerCircle(); // 当前ETL流程状态分布统计
    this.hegelu(); // 当前各库数据合格率统计
    this.conGetAllTab(); // 当前总关联成功比例
    this.conCircle();
    this.conColumn();
    this.getAllTab();
    this.getGuanLian();
    this.guanlian();
    this.shujuhu(); // 数据湖当前数据统计
    this.shujuku(); // 核心数据库当前数据统计
  },
  methods: {
    /* cellStyle({ row, column, rowIndex, colunIndex }) {
        return "text-align:center";
      },
      rowClass({ row, rowIndex }) {
        return "text-align:center";
      },*/

    // 圆形图
    containerCircle() {
      var myChart = this.$echarts.init(this.$refs.getCircle);
      let option = null;
      let name = null;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: name,
          selectedMode: false
        },
        series: [
          {
            name: "所占比例",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: []
          }
        ],
        animation: false
      };
      myChart.setOption(option);
      select_containerCircle().then(({ data }) => {
        name = data;
        myChart.setOption({
          series: [{ data: data }]
        });
      });
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      //   取消鼠标移入高亮
      myChart.on("mouseover", function() {
        myChart.dispatchAction({
          type: "downplay"
        });
      });
    },
    guanlian() {
      // 当前关联信息统计
      var myChart = this.containerColumn(this.$refs.gitGuanLian);
      let listX = ["data", "关联成功", "关联失败"];
      let listY1 = [];
      //let listY2=[];
      select_guanlian().then(({ data }) => {
        // console.log(data,"666")
        for (let i = 0; i < data.failRelatedSum.length; i++) {
          listY1.push({
            data: data.primaryTabName[i],
            关联成功: data.successRelatedSum[i],
            关联失败: data.failRelatedSum[i]
          });
        }
        //console.log(listX,"x")
        // console.log(listY1,"y")
        let option = {
          legend: {
            selectedMode: false
          },
          tooltip: {},
          dataset: {
            dimensions: listX,
            source: listY1
          },
          xAxis: { type: "category" },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            {
              type: "bar",
              label: {
                normal: {
                  show: true,
                  position: "inside"
                }
              }
            },
            {
              type: "bar",
              label: {
                normal: {
                  show: true,
                  position: "inside"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    },
    shujuhu() {
      // 数据湖当前数据统计
      var myChart = this.containerColumn(this.$refs.getCloumn1);
      select_shujuhu().then(({ data }) => {
        myChart.setOption({
          legend: {
            selectedMode: false
          },
          tooltip: {},
          xAxis: {
            name: "库名",
            data: data.nameList
          },
          yAxis: {
            name: "数量"
          },
          series: [{ data: data.sumList }]
        });
      });
    },
    shujuku() {
      // 核心数据库当前数据统计
      var myChart = this.containerColumn(this.$refs.getCloumn2);
      select_shujuku().then(({ data }) => {
        //this.tableData=data;
        // console.log(data,"555")
        myChart.setOption({
          legend: {
            selectedMode: false
          },
          tooltip: {},
          xAxis: {
            name: "库名",
            data: data.nameList,
            axisLabel: {
              rotate: 50
            }
          },
          yAxis: {
            name: "数量"
          },
          series: [{ data: data.sumList }]
        });
      });
    },
    hegelu() {
      // 当前各库数据合格率统计
      var myChart = this.containerColumn(this.$refs.getCloumn);
      select_hegelu().then(({ data }) => {
        let x = new Array();
        let hege = new Array();
        let tol = new Array();
        for (let i = 0; i < data.length; i++) {
          x[i] = data[i].fTableName;
          hege[i] = data[i].fRegularOrNot;
          tol[i] = data[i].rows;
        }
        myChart.setOption({
          legend: {
            selectedMode: false
          },
          tooltip: {},
          xAxis: {
            name: "表名",
            data: x
          },
          yAxis: {
            name: "数量"
          },
          series: [
            {
              name: "总数",
              type: "bar",
              stack: "广告",
              label: {
                normal: {
                  show: true,
                  position: "inside",
                  color: "#fff"
                }
              },
              data: tol
            },
            {
              name: "成功数",
              type: "bar",
              stack: "广告",
              label: {
                normal: {
                  show: true
                  //position: "top"
                }
              },
              data: hege
            }
          ]
        });
      });
    },
    // 当前ETL流程状态分布统计
    containerColumn: function(a) {
      var myChart = this.$echarts.init(a);
      let option = null;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          selectedMode: false
        },
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总数",
            type: "bar",
            stack: "广告",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff"
              }
            },
            data: []
          }
        ]
      };
      myChart.setOption(option);
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      return myChart;
    },
    // 当前总关联成功比例
    conGetAllTab() {
      var myChart = this.$echarts.init(this.$refs.getLineMonthData);
      let option = null;
      //let name=null;
      /*fail: 860
        other: Array(4)
        0: {base: "健康档案", baseSuccess: 880, baseFail: 190}
        1: {base: "全员人口", baseSuccess: 690, baseFail: 160}
        2: {base: "公卫", baseSuccess: 870, baseFail: 200}
        3: {base: "电子病历", baseSuccess: 1100, baseFail: 310}
        length: 4
        __proto__: Array(0)
        success: "2680"*/
      option = {};
      myChart.setOption(option);
      select_conGetAllTab().then(({ data }) => {
        //console.log(data,"777")
        let listA = ["关联成功", "关联失败"];
        let listY = [];
        let listY1 = [];
        let listY2 = [];
        let map1 = { name: "关联成功", value: data.success };
        let map2 = { name: "关联失败", value: data.fail };
        let list2 = data.other;
        for (let i = 0; i < list2.length; i++) {
          listA.push(list2[i].base);
          listY1.push({
            name: list2[i].base + "(关联成功)",
            value: list2[i].baseSuccess
          });
          listY2.push({
            name: list2[i].base + "(关联失败)",
            value: list2[i].baseFail
          });
        }
        for (let i = 0; i < listY1.length; i++) {
          listY.push(listY1[i]);
        }
        for (let i = 0; i < listY2.length; i++) {
          listY.push(listY2[i]);
        }
        let list = [map1, map2];
        //console.log(list);
        //console.log(listA)
        //console.log(listY1)
        // console.log(listY2)
        //name=list
        myChart.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: listA,
            selectedMode: false
          },
          series: [
            {
              name: "总关联比例",
              type: "pie",
              selectedMode: "single",
              radius: [0, "35%"],

              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: list
            },
            {
              name: "",
              type: "pie",
              radius: ["40%", "60%"],
              label: {
                normal: {
                  formatter: "    {b|{b}：}{c}  {per|{d}%}  ",
                  backgroundColor: "#eee",
                  borderColor: "#aaa",
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },
                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 12,
                      lineHeight: 16
                    },
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: listY
            }
          ]
        });
      });
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      //   取消鼠标移入高亮
      myChart.on("mouseover", function() {
        myChart.dispatchAction({
          type: "downplay"
        });
      });
    },
    // 自适应屏幕
    conCircle() {
      let self = this;
      window.addEventListener("resize", function() {
        self.chart = self.$echarts.init(self.$refs.getCircle);
        self.chart.resize();
      });
    },
    conColumn() {
      let self = this;
      window.addEventListener("resize", function() {
        self.chart = self.$echarts.init(self.$refs.getCloumn);
        self.chart.resize();
      });
    },
    getAllTab() {
      let self = this;
      window.addEventListener("resize", function() {
        self.chart = self.$echarts.init(self.$refs.getAllTab);
        self.chart.resize();
      });
    },
    getGuanLian() {
      let self = this;
      window.addEventListener("resize", function() {
        self.chart = self.$echarts.init(self.$refs.gitGuanLian);
        self.chart.resize();
      });
    }
  },
  components: {
    MTopNav
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
@import "~@/assets/css/mixin.scss";

.fa-home {
  font-size: $fontSize16;
  color: $color4;
  display: inline-block;
  vertical-align: middle;
  margin-top: -$fontSize8 / 4;
}
</style>
