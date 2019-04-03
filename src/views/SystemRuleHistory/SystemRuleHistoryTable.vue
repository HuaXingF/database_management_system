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

export default {
  name: "messageSearch",
  data() {
    return {
      AllStartHistoryValue: "", // 开始时间
      AllEndHistoryValue: "" // 结束时间
    };
  },
  mounted() {
    // 数据库中表规则合格数据量统计
    this.ColumnAllQualified();
    // 数据库中表合规数据量统计
    this.conLineAllQualified();
  },
  methods: {
    getOneData(valId) {
      let getObj = {};
      getObj = this.options.find(item => {
        return item.value === valId;
      });
      console.log(getObj.label);
    },
    // 数据库中表规则合格数据量统计
    ColumnAllQualified() {
      this.getColumnAssociTable(
        this.getTable,
        this.$refs.getColumnAllQualified
      );
    },
    // 数据库中表合规数据量统计
    conLineAllQualified() {
      this.getLineKernelTable(this.getTable, this.$refs.getLineAllQualified);
    },

    // 获取折线图  echarts函数
    getLineKernelTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      let legentData = [];
      let seriesData = [];
      const option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: "数量",
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          name: "名称",
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

    // 获取柱形图 echarts
    getColumnAssociTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            selectedMode: "single",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
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
