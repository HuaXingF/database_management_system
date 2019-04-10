<template>
  <el-col :span="24">
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
    <el-row :gutter="5" class="selectBox">
      <el-col :sm="7" class="selectTimeQuery" style="text-align:right;margin-right: 22.5px;">
        <i class="el-icon-date"></i>
        <span>请选择查询时间</span>
      </el-col>
      <el-col :sm="14" class="selectTimeBox">
        <div class="block dataSelect">
          <el-date-picker
            v-model="AllStartHistoryValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>数据库信息合格率统计</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="lineWeekData" style="height: 300%" ref="getLineWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <p>数据库合格率排行榜</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="lineMonthData" style="height: 300%" ref="getLineMonthData"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="24">
        <el-row :gutter="10">
          <el-col :span="8">
            <p>数据库合规数据量统计</p>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="oneDataAll" style="height: 300%" ref="getOneDataAll"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import { selectTiem, selectBing } from "@/api/SystemRuleHistoyr.js";
export default {
  data() {
    return {
      getTable: [], // 后台获取的数据  到时候直接覆盖
      AllStartHistoryValue: "", // 开始时间
      timeValue: "",
      getTableData: []
    };
  },
  mounted() {
    this.getNowData();
    // 数据库信息合格率统计
    // this.conLineWeekData();
    // 数据库合格率排行榜
    // this.conLineMonthData();
    // 数据库合规数据量统计
    // this.conOneDataAll();
  },
  methods: {
    getNowData() {
      this.timeChange();
    },
    //时间改变触发时间
    timeChange(timeId) {
      let startTime = null;
      let endTime = null;
      if (timeId == undefined) {
        startTime = this.$moment()
          .day(-4)
          .format("YYYY-MM-DD");
        endTime = this.$moment().format("YYYY-MM-DD");
      } else {
        startTime = this.$moment(timeId[0]).format("YYYY-MM-DD");
        endTime = this.$moment(timeId[1]).format("YYYY-MM-DD");
      }
      this.changeAllTable(startTime, endTime);
    },
    changeAllTable(start_time, end_time) {
      this.change1(start_time, end_time);
      this.change2(start_time, end_time);
      this.change3(start_time, end_time);
    },
    // 数据库合规数据量统计
    change1(start_time, end_time) {
      let getTableData = [];
      let getTable = [];
      let getTipName = [];
      let getAllTime = { startTime: start_time, endTime: end_time };
      selectTiem(getAllTime).then(({ data }) => {
        getTableData.push({ data: data.day });
        data.ku.forEach(item => {
          getTipName.push(item);
          getTable.push({
            name: item,
            type: "line",
            data: null
          });
        });
        getTable.forEach((item, index) => {
          data.zonghegelist.forEach((item1, index1) => {
            if (index == index1) {
              item.data = item1;
            }
          });
        });
        this.getLineTable(
          getTipName,
          getTableData,
          getTable,
          this.$refs.getOneDataAll
        );
      });
    },
    // 数据库信息合格率统计
    change2(start_time, end_time) {
      let getTableData = [];
      let getTable = [];
      let getTipName = [];
      let getFormatter = "";
      let getAllTime = { startTime: start_time, endTime: end_time };
      selectTiem(getAllTime).then(({ data }) => {
        getTableData.push({ data: data.day });
        data.ku.forEach((item, index) => {
          if (index == 0) {
            getFormatter = `{b${index}}<br/>`;
          }
          getFormatter += `{a${index}}:{c${index}}%<br />`;
          getTipName.push(item);
          getTable.push({
            name: item,
            type: "line",
            data: null
          });
        });
        getTable.forEach((item, index) => {
          data.zongHegelvList.forEach((item1, index1) => {
            if (index == index1) {
              item.data = item1;
            }
          });
        });

        let dataSourcePie = this.$echarts.init(this.$refs.getLineWeekData);
        const option = {
          tooltip: {
            trigger: "axis",
            formatter: `${getFormatter}`
          },
          legend: {
            data: getTipName
          },
          xAxis: {
            name: "名称",
            type: "category",
            boundaryGap: false,
            data: getTableData[0].data
          },
          yAxis: {
            name: "数量",
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value}%"
            }
          },
          series: getTable,
          animation: false
        };
        dataSourcePie.setOption(option);
        var triggerAction = function(action, selected) {
          option.legend = [];
          for (name in selected) {
            if (selected.hasOwnProperty(name)) {
              option.legend.push({ name: name });
            }
          }
          dataSourcePie.dispatchAction({
            type: action,
            batch: option.legend
          });
        };
        // 是否选中其中一个
        var isOneUnSelect = function(selected) {
          var unSelectedCount = 0;
          for (name in selected) {
            if (!selected.hasOwnProperty(name)) {
              continue;
            }

            if (selected[name] == false) {
              ++unSelectedCount;
            }
          }
          return unSelectedCount == 1;
        };
        dataSourcePie.on("legendselectchanged", obj => {
          var selected = obj.selected;
          var legend = obj.name;
          if (selected != undefined) {
            if (isOneUnSelect(selected)) {
              triggerAction("legendSelect", selected);
              this.$router.push({
                name: "数据规则历史统计信息(表)",
                params: { baseName: legend }
              });
            }
          }
        });
        window.addEventListener("resize", function() {
          dataSourcePie.resize();
        });
      });
    },
    // 数据库合格率排行榜
    change3(start_time, end_time) {
      let getAllData = [];
      let getSelectData = [];
      let getOutsideData = [];
      let getAllTime = { startTime: start_time, endTime: end_time };
      selectBing(getAllTime).then(({ data }) => {
        data.allList.forEach(item => {
          getAllData.push(item.fTableName);
          getOutsideData.push({
            value: item.fRegularOrNot,
            name: item.fTableName
          });
        });
        data.kuList.forEach(item => {
          getAllData.push(item.fTableName);
          getSelectData.push({
            value: item.fRegularOrNot,
            name: item.fTableName
          });
        });
        this.getPieTable(
          getAllData,
          getSelectData,
          getOutsideData,
          this.$refs.getLineMonthData
        );
      });
    },
    // 获取 折线图line的 echarts函数
    getLineTable(getTipName, getTableData, getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: getTipName
        },
        xAxis: {
          name: "名称",
          type: "category",
          boundaryGap: false,
          data: getTableData[0].data
        },
        yAxis: {
          name: "数量",
          type: "value"
        },
        series: getTable,
        animation: false
      };
      dataSourcePie.setOption(option);
      var triggerAction = function(action, selected) {
        option.legend = [];
        for (name in selected) {
          if (selected.hasOwnProperty(name)) {
            option.legend.push({ name: name });
          }
        }
        dataSourcePie.dispatchAction({
          type: action,
          batch: option.legend
        });
      };
      // 是否选中其中一个
      var isOneUnSelect = function(selected) {
        var unSelectedCount = 0;
        for (name in selected) {
          if (!selected.hasOwnProperty(name)) {
            continue;
          }

          if (selected[name] == false) {
            ++unSelectedCount;
          }
        }
        return unSelectedCount == 1;
      };
      dataSourcePie.on("legendselectchanged", obj => {
        var selected = obj.selected;
        var legend = obj.name;
        if (selected != undefined) {
          if (isOneUnSelect(selected)) {
            triggerAction("legendSelect", selected);
            this.$router.push({
              name: "数据规则历史统计信息(表)",
              params: { baseName: legend }
            });
          }
        }
      });
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },

    // 获取饼图echarts  函数
    getPieTable(getAllData, getSelectData, getOutsideData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      /*let legentData = [];
      let seriesData = [];*/
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          selectedMode: false,
          data: getAllData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: [0, "30%"],
            selectedMode: "single",
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
            data: getSelectData
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
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
                    fontSize: 14,
                    lineHeight: 14
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [1, 1],
                    borderRadius: 2
                  }
                }
              }
            },
            data: getOutsideData
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
.selectBox {
  padding-left: 25px;
  /deep/ div {
    margin-top: 5px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .el-select {
    width: 100px;
  }
  /deep/ .selectTimeQuery {
    margin-top: 17px !important;
    .el-icon-date {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
</style>
