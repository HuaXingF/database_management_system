<template>
  <el-col :span="24" class="medical-themeList">
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
        <p>本周数据湖数据总量变化图</p>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="lineWeekData" style="height: 300%" ref="getLineWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <p>数据湖数据总量月变化趋势图</p>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="lineMonthData" style="height: 300%" ref="getLineMonthData"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>单库数据总量变化趋势</p>
          </el-col>
          <el-col :span="8">
            请选择数据库: &nbsp;
            <el-select v-model="value1" @change="getValue1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            请选择统计周期: &nbsp;
            <el-select v-model="value2" @change="getValue1">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="oneDataAll" style="height: 300%" ref="getOneDataAll"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>单库数据增量变化趋势</p>
          </el-col>
          <el-col :span="8">
            请选择数据库: &nbsp;
            <el-select v-model="value3" @change="getValue2">
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
            <el-select v-model="value4" @change="getValue2">
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
        <div id="oneDataAdd" style="height: 300%" ref="getOneDataAdd"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav"
import {
  selectTotalDay,
  selectTotalMonth,
  selectTotal
} from "@/api/SystemDataLake"
//import tableLine from "../../components/echarts/table-line";

export default {
  name: "SystemDataLake",
  data() {
    return {
      lineWeekData: "lineWeekData",
      lineMonthData: "lineMonthData",
      getTable: {
        listA: [],
        listY: []
      }, // 后台获取的数据  到时候直接覆盖
      options1: [
        {
          value: "健康档案",
          label: "健康档案"
        },
        {
          value: "电子病历",
          label: "电子病历"
        },
        {
          value: "全员人口",
          label: "全员人口"
        },
        {
          value: "公卫",
          label: "公卫"
        }
      ],
      options2: [
        {
          value: "selectTotalWeek",
          label: "周"
        },
        {
          value: "selectTotalMonth",
          label: "月"
        },
        {
          value: "selectTotalYear",
          label: "年"
        }
      ],
      options3: [
        {
          value: "selectAddWeek",
          label: "周"
        },
        {
          value: "selectAddMonth",
          label: "月"
        },
        {
          value: "selectAddYear",
          label: "年"
        }
      ],
      options4: [
        {
          value: "健康档案",
          label: "健康档案"
        },
        {
          value: "电子病历",
          label: "电子病历"
        },
        {
          value: "全员人口",
          label: "全员人口"
        },
        {
          value: "公卫",
          label: "公卫"
        }
      ],
      value1: "健康档案",
      value2: "selectTotalWeek",
      value3: "健康档案",
      value4: "selectAddWeek"
    };
  },
  mounted() {
    // 本周数据湖数据总量变化图
    this.conLineWeekData()
    // 数据湖数据总量月变化趋势图
    this.conLineMonthData()
    // 单库数据总量变化趋势
    this.conOneDataAll()
    // 单库数据增量变化趋势
    this.conOneDataAdd()
  },
  methods: {
    getValue1() {
      this.conOneDataAll()
    },
    getValue2() {
      this.conOneDataAdd()
    },
    // 本周数据湖数据总量变化图
    conLineWeekData() {
      let getTable = {}
      selectTotalDay().then(({ data }) => {
        getTable.listA = data.fSelectTimeList
        getTable.listY = data.fTableRowsList
        this.getLineTable(getTable, this.$refs.getLineWeekData)
      })
    },
    // 数据湖数据总量月变化趋势图
    conLineMonthData() {
      let getTable = {}
      selectTotalMonth().then(({ data }) => {
        getTable.listA = data.fSelectTimeList
        getTable.listY = data.fTableRowsList
        this.getLineTable(getTable, this.$refs.getLineMonthData)
      })
    },
    // 单库数据总量变化趋势
    conOneDataAll() {
      let obj = {
        value1: this.value1,
        value2: this.value2
      }
      let getTable = {}
      selectTotal(obj).then(({ data }) => {
        getTable.listA = data.fSelectTimeList
        getTable.listY = data.fTableRowsList
        this.getLineTable(getTable, this.$refs.getOneDataAll)
      })
    },
    // 单库数据增量变化趋势
    conOneDataAdd() {
      let obj = {
        value1: this.value3,
        value2: this.value4
      };
      let getTable = {}
      selectTotal(obj).then(({ data }) => {
        getTable.listA = data.fSelectTimeList
        getTable.listY = data.fTableRowsList
        this.getLineTable(getTable, this.$refs.getOneDataAdd)
      })
    },
    // 获取echarts函数
    getLineTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef)
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          selectedMode: false
        },
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: getTable.listA,
          nameLocation: 'start',
          inverse: true
        },
        yAxis: {
          name: "数据量",
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "最高数据",
            type: "line",
            data: getTable.listY,
            itemStyle: {
              color: "#6ED6D7"
            },
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
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
    //tableLine
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
