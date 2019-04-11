<template>
  <el-col :span="24">
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
        <p>本周核心数据库中各库数据总量变化趋势图</p>
        <div id="KelnelDataAllWeek" style="height: 300%" ref="getKelnelDataAllWeek"></div>
      </el-col>
      <el-col :sm="12">
        <p>每月核心数据库中各库数据总量变化趋势图</p>
        <div id="KelnelDataAllMonth" style="height: 300%" ref="getKelnelDataAllMonth"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="10">
          <el-col :span="24">
            <p>本周核心数据库中各库数据增量比例图</p>
          </el-col>
        </el-row>
        <div id="KelnelDataAddWeek" style="height: 300%" ref="getKelnelDataAddWeek"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10">
          <el-col :span="24">
            <p>本月核心数据库中各库数据增量排行榜</p>
          </el-col>
        </el-row>
        <div id="KelnelDataAddMonth" style="height: 300%" ref="getKelnelDataAddMonth"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import {
  SystemDataNowWeek,
  SystemDataNowMonth,
  SystemDataAddWeek,
  SystemDataAddMonth
} from "@/api/SystemKernelData";

export default {
  name: "SystemKernelMonitorData",
  data() {
    return {
      // 后台获取的数据  到时候直接覆盖
      getTable: null,
      // 开始时间
      AllStartHistoryValue: "",
      // 结束时间
      AllEndHistoryValue: ""
    };
  },
  mounted() {
    // 本周核心数据库中各库数据总量变化趋势图
    this.conKelnelDataAllWeek();
    // 每月核心数据库中各库数据总量变化趋势图
    this.conKelnelDataAllMonth();
    // 本周核心数据库中各库数据增量比例图
    this.conKelnelDataAddWeek();
    // 本月核心数据库中各库数据增量排行榜
    this.conKelnelDataAddMonth();
  },
  methods: {
    // 本周核心数据库中各库数据总量变化趋势图
    conKelnelDataAllWeek() {
      SystemDataNowWeek().then(({ data }) => {
        let getXlist = data.xList;
        let getData = [];
        data.genList.forEach((item, index) => {
          data.allList.forEach((item1, index1) => {
            if (index == index1) {
              getData.push({
                name: item,
                type: "line",
                data: item1
              });
            }
          });
        });
        this.getLineTable(getXlist, getData, this.$refs.getKelnelDataAllWeek);
      });
    },
    // 每月核心数据库中各库数据总量变化趋势图
    conKelnelDataAllMonth() {
      SystemDataNowMonth().then(({ data }) => {
        let getXlist = data.xList;
        let getData = [];
        data.genList.forEach((item, index) => {
          data.allList.forEach((item1, index1) => {
            if (index == index1) {
              getData.push({
                name: item,
                type: "line",
                data: item1
              });
            }
          });
        });
        this.getLineTable(getXlist, getData, this.$refs.getKelnelDataAllMonth);
      });
    },
    // 本周核心数据库中各库数据增量比例图
    conKelnelDataAddWeek() {
      SystemDataAddWeek().then(({ data }) => {
        let getName = [];
        data.forEach(item => {
          getName.push(item.name);
        });
        let getData = data;
        this.getPieTable(getName, getData, this.$refs.getKelnelDataAddWeek);
      });
    },
    // 本月核心数据库中各库数据增量排行榜
    conKelnelDataAddMonth() {
      SystemDataAddMonth().then(({ data }) => {
        let getXlist = data.xlist;
        let getData = data.ylist;
        this.getColumnTable(
          getXlist,
          getData,
          this.$refs.getKelnelDataAddMonth
        );
      });
    },
    // 获取 折线图line的 echarts函数
    getLineTable(getXlist, getData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        xAxis: {
          name: "名称",
          type: "category",
          boundaryGap: false,
          data: getXlist,
          inverse: true,
          nameLocation: "start"
        },
        yAxis: {
          name: "数量",
          type: "value"
        },
        series: getData,
        animation: false
      };
      dataSourcePie.setOption(option);
      var triggerAction = function(action, selected) {
        option.legend = [];
        for (name in selected) {
          if (selected.hasOwnProperty(name)) {
            option.legend.push({ name: name });
          }
        }
        dataSourcePie.dispatchAction({
          type: action,
          batch: option.legend
        });
      };
      // 是否选中其中一个
      var isOneUnSelect = function(selected) {
        var unSelectedCount = 0;
        for (name in selected) {
          if (!selected.hasOwnProperty(name)) {
            continue;
          }
          if (selected[name] == false) {
            ++unSelectedCount;
          }
        }
        return unSelectedCount == 1;
      };
      dataSourcePie.on("legendselectchanged", obj => {
        var selected = obj.selected;
        var legend = obj.name;
        if (selected != undefined) {
          if (isOneUnSelect(selected)) {
            triggerAction("legendSelect", selected);
            localStorage.setItem("SystemKernelMonItorBaseName", legend);
            this.$router.push({
              name: "核心数据库数据监控(表)",
              params: { baseName: legend }
            });
          }
        }
      });
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
    },
    // 获取饼图echarts  函数
    getPieTable(getName, getData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: getName
        },
        series: [
          {
            name: "合格率",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            data: getData
          }
        ],
        animation: false
      };
      dataSourcePie.setOption(option);
      var triggerAction = function(action, selected) {
        option.legend = [];
        for (name in selected) {
          if (selected.hasOwnProperty(name)) {
            option.legend.push({ name: name });
          }
        }
        dataSourcePie.dispatchAction({
          type: action,
          batch: option.legend
        });
      };
      // 是否选中其中一个
      var isOneUnSelect = function(selected) {
        var unSelectedCount = 0;
        for (name in selected) {
          if (!selected.hasOwnProperty(name)) {
            continue;
          }

          if (selected[name] == false) {
            ++unSelectedCount;
          }
        }
        return unSelectedCount == 1;
      };
      dataSourcePie.on("legendselectchanged", obj => {
        var selected = obj.selected;
        var legend = obj.name;
        if (selected != undefined) {
          if (isOneUnSelect(selected)) {
            triggerAction("legendSelect", selected);
            localStorage.setItem("SystemKernelMonItorBaseName", legend);
            this.$router.push({
              name: "核心数据库数据监控(表)",
              params: { baseName: legend }
            });
          }
        }
      });
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
      dataSourcePie.on("click", res => {
        let legend = res.name;
        localStorage.setItem("SystemKernelMonItorBaseName", legend);
        this.$router.push({
          name: "核心数据库数据监控(表)",
          params: { baseName: legend }
        });
      });
    },
    // 获取柱形图  echarts函数
    getColumnTable(getXlist, getData, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            // 默认为直线，可选为：'line' | 'shadow'
            type: "shadow"
          }
        },
        legend: {},
        xAxis: [
          {
            type: "category",
            data: getXlist
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总数",
            type: "bar",
            itemStyle: {
              color: "#C23531"
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff"
              }
            },
            data: getData
          }
        ],
        animation: false
      };
      dataSourcePie.setOption(option);
      window.addEventListener("resize", function() {
        dataSourcePie.resize();
      });
      dataSourcePie.getZr().on("click", params => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (dataSourcePie.containPixel("grid", pointInPixel)) {
          let xIndex = dataSourcePie.convertFromPixel({ seriesIndex: 0 }, [
            params.offsetX,
            params.offsetY
          ])[0]; /*事件处理代码书写位置*/
          getXlist.forEach((item, index) => {
            if (index == xIndex) {
              let legend = item;
              localStorage.setItem("SystemKernelMonItorBaseName", legend);
              this.$router.push({
                name: "核心数据库数据监控(表)",
                params: { baseName: legend }
              });
            }
          });
        }
      });
    }
  },
  destroyed() {
    window.removeEventListener("resize", function() {
      dataSourcePie.resize();
    });
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
