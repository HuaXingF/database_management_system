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
                          v-model="AllEndHistoryValue"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                  </el-date-picker>
              </div>
          </el-col>
      </el-row>
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>表中记录合格率统计</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="QuantityYield" style="height: 300%" ref="getQuantityYield"></div>
      </el-col>
      <el-col :sm="12">
        <p>表中记录合格率统计</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="QuantityPie" style="height: 300%" ref="getQuantityPie"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="24">
        <el-row :gutter="10">
          <el-col :span="8">
            <p>表中字段合格数量统计</p>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="QuantityAmount" style="height: 300%" ref="getQuantityAmount"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
export default {
  data() {
    return {
      getTable: null, // 后台获取的数据  到时候直接覆盖
      AllStartHistoryValue: "", // 开始时间
      AllEndHistoryValue: "" // 结束时间
    };
  },
  mounted() {
    // 表中记录合格率统计
    this.conLineWeekData();
    // 数据库合格率排行榜
    this.conLineMonthData();
    // 表中字段合格数量统计
    this.conOneDataAll();
  },
  methods: {
    // 表中记录合格率统计
    conLineWeekData() {
      this.getLineTable(this.getTable, this.$refs.getQuantityYield);
    },
    // 数据库合格率排行榜
    conLineMonthData() {
      this.getPieTable(this.getTable, this.$refs.getQuantityPie);
    },
    // 表中字段合格数量统计
    conOneDataAll() {
      this.getLineTable(this.getTable, this.$refs.getQuantityAmount);
    },
    // 获取 折线图line的 echarts函数
    getLineTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      let legentData = [];
      let seriesData = [];
      const option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: "名称",
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          name: "数量",
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ],
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },
    // 获取饼图echarts  函数
    getPieTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      let legentData = [];
      let seriesData = [];
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["西凉", "益州", "兖州", "荆州", "幽州"],
          selectedMode: false
        },
        series: [
          {
            name: "合格率",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            data: [
              { value: 535, name: "荆州" },
              { value: 510, name: "兖州" },
              { value: 634, name: "益州" },
              { value: 735, name: "西凉" }
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
