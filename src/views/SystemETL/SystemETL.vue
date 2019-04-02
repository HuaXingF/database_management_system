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
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>指定管道读取数据量统计</p>
          </el-col>
          <el-col :span="16">
            请选择pipeline: &nbsp;
            <el-select v-model="ETLReadData" @change="getOneData">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineWeekData"></tableLine> -->
        <div id="lineKernelWeekData" style="height: 300%" ref="getLineKernelWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>指定管道写入数据量统计</p>
          </el-col>
          <el-col :span="16">
            请选择pipeline: &nbsp;
            <el-select v-model="ETLWriteData" @change="getOneData">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <tableLine :getId="lineMonthData"></tableLine> -->
        <div id="lineKernelMonthData" style="height: 300%" ref="getLineKernelMonthData"></div>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>指定管道去重数据统计</p>
          </el-col>
          <el-col :span="16">
            请选择pipeline: &nbsp;
            <el-select v-model="ETLRemoveData" @change="getOneData">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
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
            <p>指定管道去空值数据统计</p>
          </el-col>
          <el-col :span="16">
            请选择pipeline: &nbsp;
            <el-select v-model="ETLNullData">
              <el-option
                v-for="item in options"
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

export default {
  name: "messageSearch",
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
      ETLReadData: 'pipeline001',   // 指定管道读取数据量统计
      ETLWriteData: 'pipeline001',   // 指定管道写入数据量统计
      ETLRemoveData:'pipeline001',   // 指定管道去重数据统计
      ETLNullData: 'pipeline001',   // 指定管道去空值数据统计
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
    getOneData(valId) {
      let getObj = {};
      getObj = this.options.find(item => {
        return item.value === valId;
      });
      console.log(getObj.label);
    },
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
.selectBox {
  /deep/ div {
    margin-top: 5px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .el-select {
    width: 150px;
  }
}
</style>
