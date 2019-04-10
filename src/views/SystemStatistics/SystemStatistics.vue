<template>
  <el-col :span="24" class="expert-link">
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
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>当前各规则统计数据合格率排行榜（top10）</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="columnRule" style="height: 300%" ref="getColumnRule"></div>
      </el-col>
      <el-col :sm="12">
        <p>当前各库数据合格率排行榜（top10）</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="columnData" style="height: 300%" ref="getColumnData"></div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>当前各表数据合格率排行榜（top10）</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="columnTable" style="height: 300%" ref="getColumnTable"></div>
      </el-col>
      <el-col :sm="12">
        <p>当前各字段数据合格率排行榜（top10）</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="columnStr" style="height: 300%" ref="getColumnStr"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";

export default {
  name: "expertLink",
  data() {
    return {
      tablePie: null
    };
  },
  mounted() {
    // 当前各规则统计数据合格率排行榜（top10）
    this.conColumnRule();
    // 当前各库数据合格率排行榜（top10）
    this.conColumnData()
    // 当前各表数据合格率排行榜（top10）
    this.conColumnTable()
    // 当前各字段数据合格率排行榜（top10）
    this.conColumnStr()
  },
  methods: {
    // 当前各规则统计数据合格率排行榜（top10）
    conColumnRule() {
      this.getColumnTable(this.tablePie, this.$refs.getColumnRule);
    },
    // 当前各库数据合格率排行榜（top10）
    conColumnData() {
      this.getColumnTable(this.tablePie, this.$refs.getColumnData);
    },
    // 当前各表数据合格率排行榜（top10）
    conColumnTable() {
      this.getColumnTable(this.tablePie, this.$refs.getColumnTable);
    },
    // 当前各字段数据合格率排行榜（top10）
    conColumnStr() {
      this.getColumnTable(this.tablePie, this.$refs.getColumnStr);
    },
    // 获取柱形图  echarts函数
    getColumnTable(tablePie, getRef) {
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
              color: "#C23531"
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff"
              }
            },
            data: [220, 182, 191, 234, 290, 330]
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
</style>
