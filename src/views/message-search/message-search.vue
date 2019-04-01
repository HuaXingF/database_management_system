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
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>本周核心数据库数据总量变化图</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="lineKernelWeekData" style="height: 300%" ref="getLineKernelWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <p>核心数据库数据总量月变化趋势图</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="lineKernelMonthData" style="height: 300%" ref="getLineKernelMonthData"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>核心库单表数据总量变化趋势</p>
          </el-col>
          <el-col :span="8">
            请选择数据库: &nbsp;
            <el-select v-model="value" @change="conOneKernelDataAll()">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            请选择统计周期: &nbsp;
            <el-select v-model="value1" @change="conOneKernelDataAll()">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="oneKernelDataAll" style="height: 300%" ref="getOneKernelDataAll"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>核心库表数据增量变化趋势</p>
          </el-col>
          <el-col :span="8">
            请选择数据库: &nbsp;
            <el-select v-model="value4" @change="conOneKernelDataAdd()">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            请选择统计周期: &nbsp;
            <el-select v-model="value3" @change="conOneKernelDataAdd()">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="oneKernelDataAdd" style="height: 300%" ref="getOneKernelDataAdd"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import {
  selectotle_week,
  selectotle_month,
  select_trend,
  selectotle_trend} from "@/api/message-search"
export default {
  name: "messageSearch",
  data() {
    return {
      lineWeekData: "lineWeekData",
      lineMonthData: "lineMonthData",
      getTable_week: null, // 后台获取的数据  到时候直接覆盖
      getTable_month: null, // 后台获取的数据  到时候直接覆盖
      getTable_trend_total: null, // 核心库单表数据总量变化趋势
      getTable_trend: null, // 核心库表数据增量变化趋势
      value: "leave_hospital_summary",
      value4: "leave_hospital_summary",
      value1: "selectTotalWeek",
      value3: "selectAddWeek",
      options: [
        {
          value: "leave_hospital_summary",
          label: "健康档案"
        },
        {
          value: "patient_prescription",
          label: "电子病历"
        },
        {
          value: "patient_prescription_core",
          label: "全员人口"
        },
      ],
      options1: [
        {
          value: "selectTotalWeek",
          label: "按周"
        },
        {
          value: "selectTotalMonth",
          label: "按月"
        },
        {
          value: "selectTotalYear",
          label: "按年"
        }
      ],
      options3: [
        {
          value: "selectAddWeek",
          label: "按周"
        },
        {
          value: "selectAddMonth",
          label: "按月"
        },
        {
          value: "selectAddYear",
          label: "按年"
        }
      ],
      options4: [
        {
          value: "leave_hospital_summary",
          label: "健康档案"
        },
        {
          value: "patient_prescription",
          label: "电子病历"
        },
        {
          value: "patient_prescription_core",
          label: "全员人口"
        },
      ],
    };

  },
  mounted() {
    // 本周核心数据库数据总量变化图
    this.conLineKernelWeekData();
    // 核心数据库数据总量月变化趋势图
    this.conLineKernelMonthData();
    // 核心库单表数据总量变化趋势
    this.conOneKernelDataAll();
    // 核心库表数据增量变化趋势
    this.conOneKernelDataAdd();
  },
  methods: {
    // 本周核心数据库数据总量变化图
    conLineKernelWeekData() {
      selectotle_week().then(({data})=>{
        this.getTable_week = data;
        this.getLineKernelTable(this.getTable_week, this.$refs.getLineKernelWeekData);
      });
    },
    // 核心数据库数据总量月变化趋势图
    conLineKernelMonthData() {
      selectotle_month().then(({data})=>{
        this.getTable_month= data;
        this.getLineKernelTable(this.getTable_month, this.$refs.getLineKernelMonthData);
      });
    },
    // 核心库单表数据总量变化趋势
    conOneKernelDataAll() {
      let obj = {"value" : this.value, "value1" : this.value1};
      selectotle_trend(obj).then((data)=>{
        this.getTable_trend_total = data.data;
        this.getLineKernelTable(this.getTable_trend_total, this.$refs.getOneKernelDataAll);
      })
    },
    // 核心库表数据增量变化趋势
    conOneKernelDataAdd() {
      let obj = {"value" : this.value4, "value1" : this.value3};
      select_trend(obj).then(({data})=>{
        this.getTable_trend = data;
        this.getLineKernelTable(this.getTable_trend, this.$refs.getOneKernelDataAdd);
      })
    },

    // 获取echarts函数
    getLineKernelTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      let legentData = [];
      let seriesData = [];
      const option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: getTable.fSelectTimeList
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "最高数据",
            type: "line",
            data: getTable.fTableRowsList,
            itemStyle: {
              color: "#6ED6D7"
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
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
  /deep/ div {
    margin-top: 5px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .el-select {
    width: 100px;
  }
}
</style>
