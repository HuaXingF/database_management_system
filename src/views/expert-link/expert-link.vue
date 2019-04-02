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
        <p>当前各维度关联总量排行榜</p>
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
import {
  selectTableSumDesc,
  selectDimRatio
 } from "@/api/expert-link.js"
export default {
  name: "expertLink",
  data() {
    return {
      tablePie:[]
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
      var dataSourcePie = this.$echarts.init(this.$refs.getColumnAssociAllData);
      //fDimName: "mesh", fRelatedCountSum: "160"
      let listX = [];
      let listY = [];
      selectTableSumDesc().then(({data}) =>{
        console.log(data)
        for(let i=0; i<data.length;i++){
          listX.push(data[i].fDimName)
          listY.push(data[i].fRelatedCountSum)
          dataSourcePie.setOption({
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
                data: listX
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "关联成功数量",
                type: "bar",
                stack: "广告",
                itemStyle: {
                  color: "#96A7B7"
                },
                label: {
                  normal: {
                    show: true,
                    position: ["39%", 10],
                    color: "#fff"
                  }
                },
                data: listY
              }
            ],
            animation: false
          })
        }
      })

      //dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },
   /* fDimId: "001"
    fDimName: "患者"
    fFailCountSum: "120"
    fRelatedCountSum: "130"*/
    // 当前患者信息关联总量
    conPiePatientAssoci() {
      let fDimId="001"
      let  tablePie=[]
      selectDimRatio(fDimId).then(({data}) =>{
         //console.log(data)
        tablePie.push({"name":"关联成功","value":parseInt(data[0].fRelatedCountSum)})
        tablePie.push({"name":"关联失败","value":parseInt(data[0].fFailCountSum)})
        //console.log(tablePie,"666")
        this.getPieAssociTable(tablePie, this.$refs.getPiePatientAssoci);
      })

    },
    // 当前医生信息关联总量
    conPieDoctorAssoci() {
      let fDimId="002"
      let  tablePie=[]
      selectDimRatio(fDimId).then(({data}) =>{
        tablePie.push({"name":"关联成功","value":parseInt(data[0].fRelatedCountSum)})
        tablePie.push({"name":"关联失败","value":parseInt(data[0].fFailCountSum)})
        this.getPieAssociTable(tablePie, this.$refs.getPieDoctorAssoci);
      })

    },
    // 当前费用信息关联总量
    conPieCostAssoci() {
      let fDimId="003"
      let  tablePie=[]
      selectDimRatio(fDimId).then(({data}) =>{
        tablePie.push({"name":"关联成功","value":parseInt(data[0].fRelatedCountSum)})
        tablePie.push({"name":"关联失败","value":parseInt(data[0].fFailCountSum)})
        this.getPieAssociTable(tablePie, this.$refs.getPieCostAssoci);
      })

    },
    // 当前mesh信息关联总量
    conPieMeshAssoci() {
      let fDimId="004"
      let  tablePie=[]
      selectDimRatio(fDimId).then(({data}) =>{
        tablePie.push({"name":"关联成功","value":parseInt(data[0].fRelatedCountSum)})
        tablePie.push({"name":"关联失败","value":parseInt(data[0].fFailCountSum)})
        this.getPieAssociTable(tablePie, this.$refs.getPieMeshAssoci);
      })
    },
    // 获取饼形图
    getPieAssociTable(tablePie, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
     /* let legentData = [];
      let seriesData = [];*/
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "百分率",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: tablePie
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
