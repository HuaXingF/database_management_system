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
    <el-row :gutter="5" class="selectBox">
      <el-col :sm="7" class="selectTimeQuery" style="text-align:right;margin-right: 22.5px;">
        <i class="el-icon-date"></i>
        <span>请选择查询时间</span>
      </el-col>
      <el-col :sm="14" class="selectTimeBox">
        <div class="block dataSelect">
          <el-date-picker
                  v-model="timeValue"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeTime"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="5" >
          <el-col :sm="6">
            <p>患者关联数据统计</p>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="linePatientAssoic" style="height: 300%" ref="getLineKernelWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="5" >
          <el-col :sm="6">
            <p>医生关联数据统计</p>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="lineKernelMonthData" style="height: 300%" ref="getLineKernelMonthData"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="5">
          <el-col :sm="6">
            <p>费用关联数据统计</p>
          </el-col>
        </el-row>

        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="oneKernelDataAll" style="height: 300%" ref="getOneKernelDataAll"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="5" >
          <el-col :sm="6">
            <p>mesh关联数据统计</p>
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
      timeValue:'',//开始时间-结束时间
      value: "黄金糕"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
      init(){
          /**********************初始化时间***************************/
          /*this.AllStartHistoryValue= this.initDate(true); // 开始时间
          this.AllEndHistoryValue= this.initDate(false); // 结束时间*/
          //this.changeTime();
          this.initTime()
      },
    initTime(timeId){
      let end_time=new Date();
      let start_time=new Date(end_time -6*24*3600*1000);
      //console.log(end_time)
        let time=[start_time,end_time]
      this.changeTime(timeId)
    },

    // 时间改变触发时间
    changeTime(timeId) {
      let startTime = null;
      let endTime = null;
      if (timeId == null) {
        startTime = this.$moment()
          .day(-4)
          .format("YYYY-MM-DD");
        endTime = this.$moment().format("YYYY-MM-DD");
      } else {
        startTime = this.$moment(timeId[0]).format("YYYY-MM-DD");
        endTime = this.$moment(timeId[1]).format("YYYY-MM-DD");
      }
       // console.log(time1,time2)
      this.initValue(startTime,endTime);
    },
    initValue(start_time,end_time){
      this.change1(start_time,end_time)
      this.change2(start_time,end_time)
      this.change3(start_time,end_time)
      this.change4(start_time,end_time)
    },
    //患者关联数据统计
    change1(start_time,end_time){
      let obj = {"fDimId": "001", "startTime": start_time, "endTime": end_time};
      selectDimRelatedCountSum(obj).then(({data}) => {
        this.getTable_patients = data;
        //console.log(this.getTable_patients);
        this.getLineKernelTable(this.getTable_patients, this.$refs.getLineKernelWeekData);
      })
    },
    //医生关联数据统计
    change2(start_time,end_time){
      let obj = {
        "fDimId": "002",
        "startTime": start_time,
        "endTime": end_time
      }
      selectDimRelatedCountSum(obj).then(({data}) => {
        this.getTable_doctor = data;
        this.getLineKernelTable(this.getTable_doctor, this.$refs.getLineKernelMonthData);
      })
    },
    // 费用关联数据统计
    change3(start_time,end_time){
      let getTable = {}
      let obj = {
        fDimId: "003",
        startTime: start_time,
        endTime: end_time
      }
      selectDimRelatedCountSum(obj).then(({data}) => {
       // console.log(data)
        getTable = data;
        this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAll);
      })
    },
        //mesh关联数据统计
    change4(start_time,end_time){
      let getTable = {}
      let obj = {
        fDimId: "004",
        startTime: start_time,
        endTime: end_time
      }
      selectDimRelatedCountSum(obj).then(({data}) => {
       // console.log(data, "666")
        getTable = data
        //console.log(getTable)
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
        legend: {
          selectedMode: false
        },
        xAxis: {
          name:"时间",
          type: "category",
          boundaryGap: false,
          data: getTable.timeList
        },
        yAxis: {
          name:'数量',
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
           /* markLine: {
              data: [{ type: "average", name: "平均值" }]
            }*/
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
  width: 300px;
}
.selectTimeBox {
  margin-top: 8px;
}
.el-input--prefix .el-input__inner {
  padding: 0 0 0 25px;
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
