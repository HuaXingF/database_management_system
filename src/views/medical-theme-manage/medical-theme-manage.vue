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
                @change="patients()"
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
                @change="patients()"
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
                @change="doctor()"
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
                @change="doctor()"
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
                @change="conOneKernelDataAll()"
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
                @change="conOneKernelDataAll()"
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
                @change="conOneKernelDataAdd()"
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
                @change="conOneKernelDataAdd()"
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
      costStartHistoryValue: '', // 费用开始时间
      costEndHistoryValue: "", // 费用结束时间
      meshStartHistoryValue: "", // mesh开始时间
      meshEndHistoryValue: "", // mesh结束时间
      value: "黄金糕"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
      init(){
          /**********************初始化时间***************************/
          this.PatientStartHistoryValue = this.initDate(true);// 患者开始时间
          this.PatientEndHistoryValue = this.initDate(false);// 患者结束时间
          this.docStartHistoryValue= this.initDate(true); // 医生开始时间
          this.docEndHistoryValue= this.initDate(false); // 医生结束时间
          this.costStartHistoryValue= this.initDate(true); // 费用开始时间
          this.costEndHistoryValue= this.initDate(false); // 费用结束时间
          this.meshStartHistoryValue= this.initDate(true); // mesh开始时间
          this.meshEndHistoryValue= this.initDate(false); // mesh结束时间
          // 患者关联信息统计
          this.patients();
          //医生关联信息统计
          this.doctor();
          // 单表数据总量变化趋势
          this.conOneKernelDataAll();
          // mesh关联信息统计
          this.conOneKernelDataAdd();
      },
      initDate(boolean){
          var timestamp = new Date();
          var time = new Date(timestamp);
          var y = "";
          if(boolean){
              y = time.getFullYear()-1;// 去年
          }else{
              y = time.getFullYear();// 当前年
          }
          var m = time.getMonth()+1;
          var d = time.getDate();
          var h = time.getHours();
          var mm = time.getMinutes();
          var s = time.getSeconds();
          return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
      },
      // 将datatimes格式转换为string
    formartDate:function(timestamp) {
        if(timestamp == null || timestamp == ""){
            timestamp = new Date();
            var time = new Date(timestamp);
            var y = time.getFullYear()-1;
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        }else {
            var time = new Date(timestamp);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        }
    },
    add0: function(m){
      return m<10?'0'+m:m;
    },
      panduan(value, value1){
          let bool = true;
          if(value >= value1){
              this.$message.error("开始时间不能大于或等于结束时间");
              bool = false;
          }
           return bool;
      },
    // 患者关联信息统计
    patients() {
      let start_time = this.formartDate(this.PatientStartHistoryValue);
      let end_time = this.formartDate(this.PatientEndHistoryValue);
      let panduan = this.panduan(start_time, end_time);
      if(panduan) {
          let obj = {"fDimId": "001", "startTime": start_time, "endTime": end_time};
          selectDimRelatedCountSum(obj).then(({data}) => {
              this.getTable_patients = data;
              console.log(this.getTable_patients);
              this.getLineKernelTable(this.getTable_patients, this.$refs.getLineKernelWeekData);
          })
      }
    },
    // 医生关联信息统计
    doctor() {
        let start_time = this.formartDate(this.docStartHistoryValue);
        let end_time = this.formartDate(this.docEndHistoryValue);
        let panduan = this.panduan(start_time, end_time);
        if(panduan) {
            let obj = {
                "fDimId": "002",
                "startTime": start_time,
                "endTime": end_time
            }
            selectDimRelatedCountSum(obj).then(({data}) => {
                this.getTable_doctor = data;
                this.getLineKernelTable(this.getTable_doctor, this.$refs.getLineKernelMonthData);
            })
        }
    },
    // 费用关联信息统计
    conOneKernelDataAll() {
      let start_time = this.formartDate(this.costStartHistoryValue);
      let end_time = this.formartDate(this.costEndHistoryValue);
      let panduan = this.panduan(start_time, end_time);
      if(panduan) {
          let getTable = {}
          let obj = {
              fDimId: "003",
              startTime: start_time,
              endTime: end_time
          }
          selectDimRelatedCountSum(obj).then(({data}) => {
              console.log(data)
              getTable = data;
              this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAll);
          })
      }
    },
    // mesh关联信息统计
    conOneKernelDataAdd() {
        let start_time = this.formartDate(this.meshStartHistoryValue);
        let end_time = this.formartDate(this.meshEndHistoryValue);
        let panduan = this.panduan(start_time, end_time);
        if(panduan) {
            let getTable = {}
            let obj = {
                fDimId: "004",
                startTime: start_time,
                endTime: end_time
            }
            selectDimRelatedCountSum(obj).then(({data}) => {
                console.log(data, "666")
                getTable = data
                console.log(getTable)
                this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAdd);
            })
        }
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
