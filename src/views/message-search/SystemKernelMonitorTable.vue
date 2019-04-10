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
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>本周核心数据库中各表数据总量变化趋势图</p>
        <div id="KelnelTableAllWeek" style="height: 300%" ref="getKelnelTableAllWeek"></div>
      </el-col>
      <el-col :sm="12">
        <p>每月核心数据库中各表数据总量变化趋势图</p>
        <div id="KelnelTableAllMonth" style="height: 300%" ref="getKelnelTableAllMonth"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="10">
          <el-col :span="24">
            <p>本周核心数据库中各表数据增量比例图</p>
          </el-col>
        </el-row>
        <div id="KelnelTableAddWeek" style="height: 300%" ref="getKelnelTableAddWeek"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10">
          <el-col :span="24">
            <p>本月核心数据库中各表数据增量排行榜</p>
          </el-col>
        </el-row>
        <div id="KelnelTableAddMonth" style="height: 300%" ref="getKelnelTableAddMonth"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import {
  SystemTableAllWeek,
  SystemTableAllMonth,
  SystemTableAddWeek
} from "../../api/message-search.js";
export default {
  data() {
    return {
      getTable: null, // 后台获取的数据  到时候直接覆盖
      AllStartHistoryValue: "", // 开始时间
      AllEndHistoryValue: "", // 结束时间
      baseName: "" // 传递过来的表名
    };
  },
  created() {
    if (!this.$route.params.baseName) {
      this.$router.push({ name: "核心数据库数据监控(库)" });
    }
    this.baseName = this.$route.params.baseName;
  },
  mounted() {
    // 本周核心数据库中各表数据总量变化趋势图
    this.conKelnelTableAllWeek();
    // 每月核心数据库中各表数据总量变化趋势图
    this.conKelnelTableAllMonth();
    // 本周核心数据库中各表数据增量比例图
    this.conKelnelTableAddWeek();
    // 本月核心数据库中各表数据增量排行榜
    this.conKelnelTableAddMonth();
  },
  methods: {
    // 本周核心数据库中各表数据总量变化趋势图
    conKelnelTableAllWeek() {
      let baseName = this.baseName;
      SystemTableAllWeek({ baseName }).then(({ data }) => {
        let getXlist = data.xList;
        let getData = [];
        data.genList.forEach((item, index) => {
          data.allList.forEach((item1, index1) => {
            if (index == index1) {
              getData.push({
                name: item,
                type: "line",
                data: item1
              });
            }
          });
        });
        this.getLineTable(getXlist, getData, this.$refs.getKelnelTableAllWeek);
      });
    },
    // 每月核心数据库中各表数据总量变化趋势图
    conKelnelTableAllMonth() {
      let baseName = this.baseName;
      SystemTableAllMonth({ baseName }).then(({ data }) => {
        let getXlist = data.xList;
        let getData = [];
        data.genList.forEach((item, index) => {
          data.allList.forEach((item1, index1) => {
            if (index == index1) {
              getData.push({
                name: item,
                type: "line",
                data: item1
              });
            }
          });
        });
        this.getLineTable(getXlist, getData, this.$refs.getKelnelTableAllMonth);
      });
    },
    // 本周核心数据库中各表数据增量比例图
    conKelnelTableAddWeek() {
      let baseName = this.baseName;
      SystemTableAddWeek({ baseName }).then(({ data }) => {
        let getName = [];
        let getData = data;
        data.forEach(item => {
          getName.push(item.name);
        });
        this.getPieTable(getName, getData, this.$refs.getKelnelTableAddWeek);
      });
    },
    // 本月核心数据库中各表数据增量排行榜
    conKelnelTableAddMonth() {
      this.getColumnTable(this.getTable, this.$refs.getKelnelTableAddMonth);
    },
    // 获取 折线图line的 echarts函数
    getLineTable(getXlist, getData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          selectedMode: false
        },
        xAxis: {
          name: "名称",
          type: "category",
          boundaryGap: false,
          data: getXlist,
          inverse: true,
          nameLocation: "start"
        },
        yAxis: {
          name: "数量",
          type: "value"
        },
        series: getData,
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },
    // 获取饼图echarts  函数
    getPieTable(getName, getData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: getName,
          selectedMode: false
        },
        series: [
          {
            name: "合格率",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            data: getData
          }
        ],
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
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
  destroyed() {
    window.removeEventListener("resize", function() {
      dataSourcePie.resize();
    });
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
