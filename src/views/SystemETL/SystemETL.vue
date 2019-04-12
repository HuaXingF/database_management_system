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
        <el-row :gutter="10">
          <el-col :span="8">
            <p>指定管道读取数据量统计</p>
          </el-col>
          <el-col :span="16">
            请选择管道: &nbsp;
            <el-select v-model="ETLReadData" @change="getData1">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.name"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div id="lineKernelWeekData" style="height: 300%" ref="getLineKernelWeekData"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10">
          <el-col :span="8">
            <p>指定管道写入数据量统计</p>
          </el-col>
          <el-col :span="16">
            请选择管道: &nbsp;
            <el-select v-model="ETLWriteData" @change="getData2">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.name"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
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
            请选择管道: &nbsp;
            <el-select v-model="ETLRemoveData" @change="getData3">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.name"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div id="oneKernelDataAll" style="height: 300%" ref="getOneKernelDataAll"></div>
      </el-col>
      <el-col :sm="12">
        <el-row :gutter="10" class="selectBox">
          <el-col :span="8">
            <p>指定管道去空值数据统计</p>
          </el-col>
          <el-col :span="16">
            请选择管道: &nbsp;
            <el-select v-model="ETLNullData" @change="getData4">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div id="oneKernelDataAdd" style="height: 300%" ref="getOneKernelDataAdd"></div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
import { selectOneTimeAtamp, selectAllId } from "@/api/SystemETL";

export default {
  name: "SystemETL",
  data() {
    return {
      lineWeekData: "lineWeekData",
      lineMonthData: "lineMonthData",
      // 后台获取的数据  到时候直接覆盖
      getTable: null,
      options: [],
      // 指定管道读取数据量统计
      ETLReadData: "",
      // 指定管道写入数据量统计
      ETLWriteData: "",
      // 指定管道去重数据统计
      ETLRemoveData: "",
      // 指定管道去空值数据统计
      ETLNullData: "",
      startTime: null,
      endTime: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      selectAllId().then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          this.options.push({
            name: data[i].fPipelineTitle,
            value: data[i].fPipelineId
          });
        }
        this.changeTime();
        let obj = {
          fPipelineId: data[0].fPipelineId,
          startTime: this.startTime,
          endTime: this.endTime
        };
        this.changeTime(obj);
        //  指定管道读取数据量统计
        this.conLineKernelWeekData(obj);
        // 指定管道写入数据量统计
        this.conLineKernelMonthData(obj);
        //  指定管道去重数据统计
        this.conOneKernelDataAll(obj);
        // 指定管道去空值数据统计
        this.conOneKernelDataAdd(obj);
      });
    },
    // 时间改变触发时间
    changeTime(timeId) {
      let startTime = null;
      let endTime = null;
      if (timeId == undefined) {
        startTime = this.$moment()
          .subtract(6, "days")
          .format("YYYY-MM-DD");
        endTime = this.$moment().format("YYYY-MM-DD");
      } else {
        startTime = this.$moment(timeId[0]).format("YYYY-MM-DD");
        endTime = this.$moment(timeId[1]).format("YYYY-MM-DD");
      }
      this.startTime = startTime;
      this.endTime = endTime;
    },
    getData1(valId) {
      this.changeTime();
      let getObj = {};
      getObj = this.options.find(item => {
        return item.name === valId;
      });
      let obj = {
        fPipelineId: getObj.value,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.conLineKernelWeekData(obj);
    },
    getData2(valId) {
      this.changeTime();
      let getObj = {};
      getObj = this.options.find(item => {
        return item.name === valId;
      });
      let obj = {
        fPipelineId: getObj.value,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.conLineKernelMonthData(obj);
    },
    getData3(valId) {
      this.changeTime();
      let getObj = {};
      getObj = this.options.find(item => {
        return item.name === valId;
      });
      let obj = {
        fPipelineId: getObj.value,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.conOneKernelDataAll(obj);
    },
    getData4(valId) {
      this.changeTime();
      let getObj = {};
      getObj = this.options.find(item => {
        return item.name === valId;
      });
      let obj = {
        fPipelineId: getObj.value,
        startTime: this.startTime,
        endTime: this.endTime
      };
      this.conOneKernelDataAdd(obj);
    },
    //  指定管道读取数据量统计
    conLineKernelWeekData(obj) {
      let listA = [];
      let listY = [];
      selectOneTimeAtamp(obj).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          listA.push(data[i].fSelectTime);
          listY.push(data[i].fReadSum);
        }
        let getTable = {
          listA: listA,
          listY: listY
        };
        this.getLineKernelTable(getTable, this.$refs.getLineKernelWeekData);
      });
    },
    // 指定管道写入数据量统计
    conLineKernelMonthData(obj) {
      let listA = [];
      let listY = [];
      selectOneTimeAtamp(obj).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          listA.push(data[i].fSelectTime);
          listY.push(data[i].fWriteSum);
        }
        let getTable = {
          listA: listA,
          listY: listY
        };
        this.getLineKernelTable(getTable, this.$refs.getLineKernelMonthData);
      });
    },
    //  指定管道去重数据统计
    conOneKernelDataAll(obj) {
      let listA = [];
      let listY = [];
      selectOneTimeAtamp(obj).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          listA.push(data[i].fSelectTime);
          listY.push(data[i].fRdCount);
        }
        let getTable = {
          listA: listA,
          listY: listY
        };
        this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAll);
      });
    },
    //指定管道去空值数据统计
    conOneKernelDataAdd(obj) {
      let listA = [];
      let listY = [];
      selectOneTimeAtamp(obj).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          listA.push(data[i].fSelectTime);
          listY.push(data[i].fRnCount);
        }
        let getTable = {
          listA: listA,
          listY: listY
        };
        this.getLineKernelTable(getTable, this.$refs.getOneKernelDataAdd);
      });
    },
    // 获取echarts函数
    getLineKernelTable(getTable, getRef) {
      let dataSourcePie = this.$echarts.init(getRef);
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
          data: getTable.listA
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
