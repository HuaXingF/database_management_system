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
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
          border
          style="width: 100%"
        >
          <el-table-column prop="date" label="数据项"></el-table-column>
          <el-table-column prop="nowData" label="当前数据总量"></el-table-column>
          <el-table-column prop="dateData" label="当日数据总量"></el-table-column>
          <el-table-column prop="unFile" label="非结构文件"></el-table-column>
          <el-table-column prop="grade" label="数据质量评分"></el-table-column>
        </el-table>
      </el-col>
      <el-col :sm="12">
        <p>核心数据库当前数据统计</p>
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
          border
          style="width: 100%"
        >
          <el-table-column prop="date" label="数据项"></el-table-column>
          <el-table-column prop="nowData" label="当前数据总量"></el-table-column>
          <el-table-column prop="dateData" label="当日数据总量"></el-table-column>
          <el-table-column prop="unFile" label="非结构文件"></el-table-column>
          <el-table-column prop="grade" label="数据质量评分"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- echarts图表 -->
    <el-row :gutter="50">
      <el-col :sm="12">
        <p>当前ETL流程状态分布统计</p>
        <div id="container-circle" style="height: 300%" ref="getCircle"></div>
        <!-- <tablePie :getId="pieETLData" :tableData='getPieETLData'></tablePie> -->
      </el-col>
      <el-col :sm="12">
        <p>当前各表数据合格率统计</p>
        <div id="container-column" style="height: 300%" ref="getCloumn"></div>
        <!-- <tableColumn :getId="columnNowData"></tableColumn> -->
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <!-- 当前关联信息统计 -->
      <el-col :sm="12">
        <p>当前关联信息统计</p>
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
          border
          style="width: 100%"
        >
          <el-table-column prop="date" label="数据项"></el-table-column>
          <el-table-column prop="nowData" label="当前数据总量"></el-table-column>
          <el-table-column prop="dateData" label="当日数据总量"></el-table-column>
          <el-table-column prop="unFile" label="非结构文件"></el-table-column>
          <el-table-column prop="grade" label="数据质量评分"></el-table-column>
        </el-table>
      </el-col>
      <!-- 当前所有表关联成功比例 -->
      <el-col :sm="12">
        <p>当前所有表关联成功比例</p>
        <div id="container-getAllTab" style="height: 300%" ref="getAllTab"></div>
        <!-- <tablePie :getId="pieAllSucc"></tablePie> -->
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import { getAllTab } from "@/api/index.js";
import tablePie from "../../components/echarts/table-pie";
import tableColumn from "../../components/echarts/table-column";
export default {
  name: "systemSetting",
  data() {
    return {
      pieETLData: "pieETLData",
      columnNowData: "columnNowData",
      pieAllSucc: "pieAllSucc",
      getPieETLData: null,
      tableData: [
        {
          date: "电子病历",
          nowData: "121",
          dateData: "1518",
          unFile: "1518",
          grade: "78/123"
        },
        {
          date: "电子病历",
          nowData: "121",
          dateData: "1518",
          unFile: "1518",
          grade: "78/123"
        },
        {
          date: "电子病历",
          nowData: "121",
          dateData: "1518",
          unFile: "1518",
          grade: "78/123"
        },
        {
          date: "电子病历",
          nowData: "121",
          dateData: "1518",
          unFile: "1518",
          grade: "78/123"
        },
        {
          date: "电子病历",
          nowData: "121",
          dateData: "1518",
          unFile: "1518",
          grade: "78/123"
        }
      ]
    };
  },
  created() {
  },
  mounted() {
    this.containerCircle();
    this.containerColumn();
    this.conGetAllTab();
    this.conCircle();
    this.conColumn();
    this.getAllTab();
    // getAllTab().then(res => {
    //   // console.log(res)
    //   this.getPieETLData = res.data
    //   localStorage.setItem("getData",JSON.stringify(res.data))
    // })
  },
  methods: {
    cellStyle({ row, column, rowIndex, colunIndex }) {
      return "text-align:center";
    },
    rowClass({ row, rowIndex }) {
      return "text-align:center";
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
            name: "访问来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ],
        animation: false
      };
      myChart.setOption(option);
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
    // 柱形图
    containerColumn() {
      var myChart = this.$echarts.init(this.$refs.getCloumn);
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
              "电子病历",
              "健康档案",
              "全员人口",
              "公卫",
              "基础信息",
              "门诊记录"
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
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            label: {
              normal: {
                show: true,
                position: ["40%", 10],
                color: "#fff"
              }
            },
            data: [220, 182, 191, 234, 290, 330]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: [120, 132, 101, 134, 90, 230]
          }
        ]
        // animation: false
      };
      myChart.setOption(option);
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      // 取消鼠标移入高亮
      //   myChart.on("mouseover", function() {
      //     myChart.dispatchAction({
      //       type: "downplay"
      //     });
      //   });
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
            name: "访问来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" }
            ]
          }
        ],
        animation: false
      };
      myChart.setOption(option);
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
    MTopNav,
    tablePie,
    tableColumn
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
