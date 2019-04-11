<template>
  <el-col :span="24">
    <MTopNav>
      <template slot="pageName">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <i class="fa fa-home"></i>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/SystemRuleHistoryData' }">数据规则历史信息统计</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/SystemRuleHistoryTable' }">数据规则历史信息统计(表)</el-breadcrumb-item>
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
            end-placeholder="结束日期"
            @change="selcetTime"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>{{this.baseName}}表中记录合格率统计</p>
        <div id="QuantityYield" style="height: 300%" ref="getQuantityYield"></div>
      </el-col>
      <el-col :sm="12">
        <p>{{this.baseName}}表中记录合格率统计</p>
        <div id="QuantityPie" style="height: 300%" ref="getQuantityPie"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="24">
        <el-row :gutter="10">
          <el-col :span="8">
            <p>{{this.baseName}}表中字段合格数量统计</p>
          </el-col>
        </el-row>
        <div id="QuantityAmount" style="height: 300%" ref="getQuantityAmount"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav"
import {
  selectRuleHistoryStr,
  selectRuleHistoryPieStr
} from "@/api/SystemRuleHistoy"

export default {
  name: 'SystemRuleHistoyStr',
  data() {
    return {
      // 后台获取的数据  到时候直接覆盖
      getTable: null, 
      // 开始时间
      AllStartHistoryValue: "", 
      // 结束时间
      AllEndHistoryValue: "", 
      baseName: ""
    };
  },
  created() {
    this.baseName = this.$route.params.baseName
  },
  mounted() {
    this.init()
  },
  methods: {
    init(timeId) {
      this.selcetTime(timeId)
    },
    selcetTime(timeId) {
      let startTime = null
      let endTime = null
      if (timeId == null) {
        startTime = this.$moment()
          .day(-4)
          .format("YYYY-MM-DD");
        endTime = this.$moment().format("YYYY-MM-DD")
      } else {
        startTime = this.$moment(timeId[0]).format("YYYY-MM-DD")
        endTime = this.$moment(timeId[1]).format("YYYY-MM-DD")
      }
      this.initTableQualified(startTime, endTime)
    },
    // 表中记录合格率统计
    initTableQualified(startTime, endTime) {
      // 获取x轴
      let getXlist = [] 
      // 获取y轴
      let getYlist = []
      // 获取所有合格率的数组
      let getHeGeLv = [] 
      // 获取单个合格率的数组
      let getList = []
      // 获取合格率的所有数据
      let getAllData = [] 
      // 获取合格的数组
      let getHeGe = [] 
      // 获取合格的所有数据
      let getHeGeData = [] 
      // 获取单个合格的数组
      let getHeGeList = [] 
      let baseName = this.baseName
      // 获取百分比
      let getFormatter = ""
      // 表中记录合格率统计
      selectRuleHistoryStr({ startTime, endTime, baseName }).then(
        ({ data }) => {
          getXlist = data.xList
          getYlist = data.yList
          data.allList.forEach((item, index) => {
            item.forEach((item1, index1) => {
              getHeGeLv.push(item1.heGeLv)
              getHeGe.push(item1.heGe)
            })
            getList = getHeGeLv.splice(0, item.length)
            getHeGeList = getHeGe.splice(0, item.length)
            getYlist.forEach((item2, index2) => {
              if (index2 == 0) {
                getFormatter = `{b${index2}}<br/>`
              }
              getFormatter += `{a${index2}}:{c${index2}}%<br />`
              if (index == index2) {
                getAllData.push({
                  name: item2,
                  type: "line",
                  data: getList
                })
                getHeGeData.push({
                  name: item2,
                  type: "line",
                  data: getHeGeList
                })
              }
            })
          })
          // 表中字段合格数量统计
          this.getLineTable(
            getXlist,
            getHeGeData,
            this.$refs.getQuantityAmount
          )
          // 表中记录合格率统计
          let dataSourcePie = this.$echarts.init(this.$refs.getQuantityYield)
          const option = {
            legend: {
              selectedMode: false
            },
            tooltip: {
              trigger: "axis",
              formatter: `${getFormatter}`
            },
            xAxis: {
              name: "名称",
              type: "category",
              boundaryGap: false,
              data: getXlist
            },
            yAxis: {
              name: "数量",
              type: "value",
              axisLabel: {
                show: true,
                interval: "auto",
                formatter: "{value} %"
              }
            },
            series: getAllData,
            animation: false
          };
          dataSourcePie.setOption(option)
          window.addEventListener("resize", function() {
            dataSourcePie.resize()
          })
        }
      )
      // 表中记录合格率统计饼图
      selectRuleHistoryPieStr({ startTime, endTime, baseName }).then(
        ({ data }) => {
          let getName = []
          let getPieData = []
          data.forEach(item => {
            getName.push(item.name)
          })
          getPieData = data;
          this.getPieTable(getName, getPieData, this.$refs.getQuantityPie)
        }
      )
    },
    // 获取 折线图line的 echarts函数
    getLineTable(getXlist, getAllData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef)
      const option = {
        legend: {
          selectedMode: false
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: "名称",
          type: "category",
          boundaryGap: false,
          data: getXlist
        },
        yAxis: {
          name: "数量",
          type: "value"
        },
        series: getAllData,
        animation: false
      }
      dataSourcePie.setOption(option)
      window.addEventListener("resize", function() {
        dataSourcePie.resize()
      })
    },
    // 获取饼图echarts  函数
    getPieTable(getName, getPieData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef)
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
            data: getPieData
          }
        ],
        animation: false
      }
      dataSourcePie.setOption(option)
      window.addEventListener("resize", function() {
        dataSourcePie.resize()
      })
    }
  },
  computed: {},
  components: {
    MTopNav
  }
}
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
