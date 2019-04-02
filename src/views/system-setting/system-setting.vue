<template>
  <el-col :span="24" class="system-setting">
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
    <!-- 常规表 -->
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>数据湖当前数据统计</p>
        <div id="container-column1" style="height: 300%" ref="getCloumn1"></div>
      </el-col>
      <el-col :sm="12">
        <p>核心数据库当前数据统计</p>
        <div id="container-column2" style="height: 300%" ref="getCloumn2"></div>
      </el-col>
    </el-row>
    <!-- echarts图表 -->
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>当前ETL流程状态分布统计</p>
        <div id="container-circle" style="height: 300%" ref="getCircle"></div>
      </el-col>
      <el-col :sm="12">
        <p>当前各表数据合格率统计</p>
        <div id="container-column" style="height: 300%" ref="getCloumn"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <!-- 当前关联信息统计 -->
      <el-col :sm="12">
        <p>当前关联信息统计</p>
        <el-table
                :data="tableData2"
                :cell-style="cellStyle"
                :header-cell-style="rowClass"
                border
                style="width: 100%"
        >
          <el-table-column prop="primaryTabName" label="数据项"></el-table-column>
          <el-table-column prop="successRelatedSum" label="当前关联成功数"></el-table-column>
          <el-table-column prop="failRelatedSum" label="当前关联失败数"></el-table-column>
          <el-table-column prop="primaryCountSum" label="已有记录数"></el-table-column>
          <!-- <el-table-column prop="grade" label="数据质量评分"></el-table-column>-->
        </el-table>
      </el-col>
      <!-- 当前所有表关联成功比例 -->
      <el-col :sm="12">
        <p>当前所有表关联成功比例</p>
        <div id="container-getAllTab" style="height: 300%" ref="getAllTab"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
  import MTopNav from "@/components/m-topNav/m-topNav";
  import {select_shujuhu,
    select_shujuku,
    select_containerCircle,
    select_hegelu,
    select_conGetAllTab} from "@/api/system-setting"
  export default {
    name: "systemSetting",
    data() {
      return {
        //   containerCircle: "containerCircle",
        //   containerColumn: "containerColumn",
        tableData: [ ],
        tableData1: [ ],//核心数据库当前数据统计
        tableData2: [ ]//当前关联信息统计
      };
    },
    mounted() {
      console.log(this.$refs.getCloumn);
      this.containerCircle();// 当前ETL流程状态分布统计
      this.hegelu();// 当前各表数据合格率统计
      this.conGetAllTab();// 当前所有表关联成功比例
      this.conCircle();
      this.conColumn();
      this.getAllTab();
      this.init();
      this.shujuhu();// 数据湖当前数据统计
      this.shujuku();// 核心数据库当前数据统计
    },
    methods: {
      cellStyle({ row, column, rowIndex, colunIndex }) {
        return "text-align:center";
      },
      rowClass({ row, rowIndex }) {
        return "text-align:center";
      },
      init(){
        this.$http.get("/relationShip/selectSuccessOrFail").then(({data})=>{
          this.tableData2=data;
        });
      },
      // 圆形图
      containerCircle() {
        var myChart = this.$echarts.init(this.$refs.getCircle);
        let option = null;
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "所占比例",
              type: "pie",
              radius: "80%",
              center: ["50%", "50%"],
              data: [

              ]
            }
          ],
          animation: false
        };
        myChart.setOption(option);
        select_containerCircle().then(({data})=>{
          myChart.setOption({
            series :[
              {data:data}
            ]
          });
        });
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
        //   取消鼠标移入高亮
        myChart.on("mouseover", function() {
          myChart.dispatchAction({
            type: "downplay"
          });
        });
      },
      shujuhu(){ // 数据湖当前数据统计
        var myChart = this.containerColumn(this.$refs.getCloumn1);
        select_shujuhu().then(({data})=>{
          myChart.setOption({
            xAxis : {
              data : data.nameList
            },
            series :[
              {data:data.sumList}
            ]
          });
        });
      },
      shujuku(){ // 核心数据库当前数据统计
        var myChart = this.containerColumn(this.$refs.getCloumn2);
        select_shujuku().then(({data})=>{
          this.tableData=data;
          myChart.setOption({
            xAxis : {
              data : data.nameList,
              axisLabel:{
                rotate: 50
              }
            },
            series :[
              {data:data.sumList}
            ]
          });
        });
      },
      hegelu(){ // 当前各表数据合格率统计
        var myChart = this.containerColumn(this.$refs.getCloumn);
        select_hegelu().then(({data})=>{
          let x = new Array();
          let hege = new Array();
          let tol = new Array();
          for(let i=0; i<data.length;i++) {
            x[i] = data[i].fTableName;
            hege[i] = data[i].fRegularOrNot;
            tol[i] = data[i].rows;
          }
          myChart.setOption({
            xAxis : {
              data : x
            },
            series :[
              {data:hege},
              {data:tol}
            ]
          });
        });
      },
      // 柱形图
      containerColumn : function(a) {
        var myChart = this.$echarts.init(a);
        let option = null;
        option = {
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
              data: [

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
              name: "合格数",
              type: "bar",
              stack: "广告",
              label: {
                normal: {
                  show: true,
                  position: ["50%", 10],
                  color: "#fff"
                }
              },
              data: []
            },
            {
              name: "总数",
              type: "bar",
              stack: "广告",
              label: {
                normal: {
                  show: true,
                  //position: "top"
                }
              },
              data: []
            }
          ]
          // animation: false
        };
        myChart.setOption(option);
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
        return myChart;
      },
      // 第二个圆形图
      conGetAllTab() {
        var myChart = this.$echarts.init(this.$refs.getAllTab);
        let option = null;
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "所占比例",
              type: "pie",
              radius: "80%",
              center: ["50%", "50%"],
              data: [

              ]
            }
          ],
          animation: false
        };
        myChart.setOption(option);
        select_conGetAllTab().then(({data})=>{
          let map={"name":"关联成功","value":data.success};
          let map1={"name":"未关联","value":data.fail};
          let list = [map,map1];
          console.log(list);
          myChart.setOption({
            series :[
              {data:list}
            ]
          });
        });
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
        //   取消鼠标移入高亮
        myChart.on("mouseover", function() {
          myChart.dispatchAction({
            type: "downplay"
          });
        });
      },
      // 自适应屏幕
      conCircle() {
        let self = this;
        window.addEventListener("resize", function() {
          self.chart = self.$echarts.init(self.$refs.getCircle);
          self.chart.resize();
        });
      },
      conColumn() {
        let self = this;
        window.addEventListener("resize", function() {
          self.chart = self.$echarts.init(self.$refs.getCloumn);
          self.chart.resize();
        });
      },
      getAllTab() {
        let self = this;
        window.addEventListener("resize", function() {
          self.chart = self.$echarts.init(self.$refs.getAllTab);
          self.chart.resize();
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
