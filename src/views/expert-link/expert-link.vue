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
        <p>当前各表据关联总量排行榜</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="columnAssociAllData" style="height: 300%" ref="getColumnAssociAllData"></div>
      </el-col>
      <el-col :sm="12">
        <p>当前患者信息关联总量</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="piePatientAssoci" style="height: 300%" ref="getPiePatientAssoci"></div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="8">
        <p>当前医生信息关联总量</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="pieDoctorAssoci" style="height: 300%" ref="getPieDoctorAssoci"></div>
      </el-col>
      <el-col :sm="8">
        <p>当前费用信息关联总量</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="pieCostAssoci" style="height: 300%" ref="getPieCostAssoci"></div>
      </el-col>
      <el-col :sm="8">
        <p>当前mesh信息关联总量</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="pieMeshAssoci" style="height: 300%" ref="getPieMeshAssoci"></div>
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
    // 当前各表据关联总量排行榜
    this.conColumnAssociAllData();
    // 当前患者信息关联总量
    this.conPiePatientAssoci();
    // 当前医生信息关联总量
    this.conPieDoctorAssoci();
    // 当前费用信息关联总量
    this.conPieCostAssoci();
    // 当前mesh信息关联总量
    this.conPieMeshAssoci();
  },
  methods: {
    // 当前各表据关联总量排行榜
    conColumnAssociAllData() {
      let dataSourcePie = this.$echarts.init(this.$refs.getColumnAssociAllData);
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
          }
        ],
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },
    // 当前患者信息关联总量
    conPiePatientAssoci() {
      this.getPieAssociTable(this.tablePie, this.$refs.getPiePatientAssoci);
    },
    // 当前医生信息关联总量
    conPieDoctorAssoci() {
      this.getPieAssociTable(this.tablePie, this.$refs.getPieDoctorAssoci);
    },
    // 当前费用信息关联总量
    conPieCostAssoci() {
      this.getPieAssociTable(this.tablePie, this.$refs.getPieCostAssoci);
    },
    // 当前mesh信息关联总量
    conPieMeshAssoci() {
      this.getPieAssociTable(this.tablePie, this.$refs.getPieMeshAssoci);
    },
    // 获取饼形图
    getPieAssociTable(tablePie, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
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
