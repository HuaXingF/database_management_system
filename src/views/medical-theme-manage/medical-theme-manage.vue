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
      getTable: null, // 后台获取的数据  到时候直接覆盖
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      PatientStartHistoryValue: '', // 患者开始时间
      PatientEndHistoryValue: '', // 患者结束时间
      docStartHistoryValue: '', // 医生开始时间
      docEndHistoryValue: '', // 医生结束时间
      costStartHistoryValue: '', // 费用开始时间
      costEndHistoryValue: '', // 费用结束时间
      meshStartHistoryValue: "", // mesh开始时间
      meshEndHistoryValue: "", // mesh结束时间
      value: "黄金糕"
    };
  },
  mounted() {
    // 本周数据湖数据总量变化图
    this.conLineKernelWeekData();
    // 数据湖数据总量月变化趋势图
    this.conLineKernelMonthData();
    // 单表数据总量变化趋势
    this.conOneKernelDataAll();
    // 单表数据增量变化趋势
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
    // 单表数据总量变化趋势
    conOneKernelDataAll() {
      this.getLineKernelTable(this.getTable, this.$refs.getOneKernelDataAll);
    },
    // 单表数据增量变化趋势
    conOneKernelDataAdd() {
      this.getLineKernelTable(this.getTable, this.$refs.getOneKernelDataAdd);
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
            data: [11, 11, 15, 13, 12, 13, 20],
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
