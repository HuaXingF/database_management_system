<template>
  <el-col :span="24" class="message-search">
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
            @change="selectTime"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :sm="24">
        <el-row :gutter="10">
          <el-col :span="8">
            <p>数据库中表规则合格数据量统计</p>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="columnAllQualified" style="height: 300%" ref="getColumnAllQualified"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="24">
        <el-row :gutter="10">
          <el-col :span="8">
            <p>数据库中表合规数据量统计</p>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="lineAllQualified" style="height: 300%" ref="getLineAllQualified"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import {
  selectRuleTable,
  selectRuleComTable
} from "@/api/SystemRuleHistoyr.js";
export default {
  name: "messageSearch",
  data() {
    return {
      AllStartHistoryValue: "", // 开始时间
      flagTime: 0
    };
  },
  mounted() {
    this.init();
    console.log(this.$route.params.strName)
  },
  methods: {
    init(timeId) {
      this.selectTime(timeId);
    },
    // 时间选择器改变时触发，获取时间
    selectTime(timeId) {
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
      this.initQualified(startTime, endTime);
      this.initCompliance(startTime, endTime);
    },
    // 数据库中表规则合格数据量统计
    initQualified(startTime, endTime) {
      let getXlist = [];
      let getYlist = [];
      let getAllList = [];
      let getAllData = [];
      selectRuleTable({ startTime, endTime }).then(({ data }) => {
        data.xList.forEach(item => {
          getXlist.push(item);
        });
        data.all.forEach(item => {
          getAllData.push({
            name: item.name[0],
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: item.num
          });
        });
        this.getColumnAssociTable(
          getXlist,
          getAllData,
          this.$refs.getColumnAllQualified
        );
      });
    },
    // 数据库中表合规数据量统计
    initCompliance(startTime, endTime) {
      let getXlist = [];
      let getYlist = [];
      let getAllData = [];
      let getAllLine = [];
      selectRuleComTable({ startTime, endTime }).then(({ data }) => {
        data.xList.forEach((item, index) => {
          getXlist.push(item);
        });
        data.genList.forEach(item => {
          getAllLine.push(item);
        });
        // console.log(getAllData);
        data.yList.forEach((item, index) => {
          getYlist.push(item);
          getAllLine.forEach((item1, index1) => {
            if (index == index1) {
              getAllData.push({
                name: item1,
                type: "line",
                data: item
              });
            }
          });
        });
        this.getLineKernelTable(
          getXlist,
          getAllData,
          this.$refs.getLineAllQualified
        );
      });
    },
    // 获取折线图  echarts函数
    getLineKernelTable(getXlist, getAllData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          selectedMode: false
        },
        xAxis: {
          name: "数量",
          type: "category",
          boundaryGap: false,
          data: getXlist
        },
        yAxis: {
          name: "名称",
          type: "value"
        },
        series: getAllData,
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },

    // 获取柱形图 echarts
    getColumnAssociTable(getXlist, getAllData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          name: "数量",
          type: "value"
        },
        xAxis: {
          name: "名称",
          type: "category",
          data: getXlist
        },
        series: getAllData
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    }
  },
  // watch: {
  //   getTable: {
  //     handler(newValue,oldValue) {
  //       this.getLineTable(tableData,getRef);
  //     },
  //     deep: true
  //   }
  // },
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
