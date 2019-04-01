<template>
  <el-col :span="24" class="medical-themeManage">
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
        <el-row :gutter="5" class="selectBox">
          <el-col :sm="6">
            <p>患者关联信息统计</p>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block dataSelect">
              <span class="demonstration">开始时间: &nbsp;</span>
              <el-date-picker
                v-model="PatientStartHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block">
              <span class="demonstration">结束时间: &nbsp;</span>
              <el-date-picker
                v-model="PatientEndHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="linePatientAssoic" style="height: 300%" ref="getLineKernelWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="5" class="selectBox">
          <el-col :sm="6">
            <p>医生关联信息统计</p>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block dataSelect">
              <span class="demonstration">开始时间: &nbsp;</span>
              <el-date-picker
                v-model="docStartHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block">
              <span class="demonstration">结束时间: &nbsp;</span>
              <el-date-picker
                v-model="docEndHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="lineKernelMonthData" style="height: 300%" ref="getLineKernelMonthData"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="5" class="selectBox">
          <el-col :sm="6">
            <p>费用关联信息统计</p>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block dataSelect">
              <span class="demonstration">开始时间: &nbsp;</span>
              <el-date-picker
                v-model="costStartHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block">
              <span class="demonstration">结束时间: &nbsp;</span>
              <el-date-picker
                v-model="costEndHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="oneKernelDataAll" style="height: 300%" ref="getOneKernelDataAll"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="5" class="selectBox">
          <el-col :sm="6">
            <p>mesh关联信息统计</p>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block dataSelect">
              <span class="demonstration">开始时间: &nbsp;</span>
              <el-date-picker
                v-model="meshStartHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :sm="9" class="selectTimeBox">
            <div class="block">
              <span class="demonstration">结束时间: &nbsp;</span>
              <el-date-picker
                v-model="meshEndHistoryValue"
                type="datetime"
                placeholder="选择日期时间"
                style="font-size: 10px"
              ></el-date-picker>
            </div>
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
  selectDimRelatedCountSum

} from "@/api/medical-theme-manage.js"
export default {

  name: "medicalThemeManage",
  data() {
    return {
      lineWeekData: "lineWeekData",
      lineMonthData: "lineMonthData",
      getTable: {}, // 后台获取的数据  到时候直接覆盖
      PatientStartHistoryValue: '', // 患者开始时间
      PatientEndHistoryValue: '', // 患者结束时间
      docStartHistoryValue: '', // 医生开始时间
      docEndHistoryValue: '', // 医生结束时间
      costStartHistoryValue: '2018-09-08', // 费用开始时间
      costEndHistoryValue: "2019-09-08", // 费用结束时间
      meshStartHistoryValue: "2018-09-08", // mesh开始时间
      meshEndHistoryValue: "2019-09-08", // mesh结束时间
      value: "黄金糕"
    };
  },
  mounted() {
    // 本周数据湖数据总量变化图
    this.conLineKernelWeekData();
    // 数据湖数据总量月变化趋势图
    this.conLineKernelMonthData();
    //费用关联信息统计
    this.conOneKernelDataAll();
    // mesh关联信息统计
    this.conOneKernelDataAdd();
  },
  methods: {
    // 本周数据湖数据总量变化图
    conLineKernelWeekData() {
      this.getLineKernelTable(this.getTable, this.$refs.getLineKernelWeekData);
    },
    // 数据湖数据总量月变化趋势图
    conLineKernelMonthData() {
      this.getLineKernelTable(this.getTable, this.$refs.getLineKernelMonthData);
    },
    // 费用关联信息统计
    conOneKernelDataAll() {
      let getTable={}
      let obj={
        fDimId:"003",
        startTime:this.costStartHistoryValue,
        endTime:this.costEndHistoryValue
      }
      selectDimRelatedCountSum(obj).then(({data}) =>{
        console.log(data)
        getTable=data
        this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAll);
      })

    },
    // mesh关联信息统计
    conOneKernelDataAdd() {
      let getTable={}
      let obj={
        fDimId:"004",
        startTime:this.meshStartHistoryValue,
        endTime:this.meshEndHistoryValue
      }
      selectDimRelatedCountSum(obj).then(({data}) =>{
        console.log(data,"666")
        getTable=data
        console.log(getTable)
        this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAdd);
      })

    },

    // 获取echarts函数
    getLineKernelTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
     /* let legentData = [];
      let seriesData = [];*/
      const option = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: getTable.timeList
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
            data:  getTable.sumList,
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
.dataSelect {
  /deep/ div {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 150px;
    }
  }
  .el-select {
    width: 100px;
  }
}
.block .dataSelect {
  margin-top: 8px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px;
}
.selectTimeBox {
  margin-top: 8px;
}
.el-input--prefix .el-input__inner {
  padding: 0 0 0 25px;
}
</style>
