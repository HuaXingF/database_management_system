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
      <el-col :span="24">
        <p>新增数据规则</p>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :sm="24">
        <div class="addRuleBox">
          <div class="ruleCon">
            <p>规则名称</p>
            <el-input v-model="ruleNameInput" placeholder="请输入规则名称" @blur="getRuleName"></el-input>
          </div>
          <div class="ruleCon">
            <p>规则类别</p>
            <el-input v-model="ruleClassInput" placeholder="请输入规则类别" @blur="getRuleClass"></el-input>
          </div>
          <div class="ruleCon">
            <p>数据库名</p>
            <el-select v-model="getDataVal" placeholder="请选择" @change="getRuleData">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="ruleCon">
            <p>数据表名</p>
            <el-select v-model="getDataNameVal" placeholder="请选择" @change="getRuleDataName">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="ruleCon">
            <p>字 段 名</p>
            <el-select v-model="getStrNameVal" placeholder="请选择" @change="getRuleStrName">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="ruleCon">
            <p>规则定义</p>
            <el-input v-model="ruleDfnInput" placeholder="请输入规则定义" @blur="getRuleDfn"></el-input>
          </div>
          <div class="ruleCon ruleBtn">
            <el-button type="primary">取消</el-button>
            <el-button type="success" @click="submitBtn">提交</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 消息提示 -->
    <el-button :plain="true" @click="open"></el-button>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav";
export default {
  name: "indexingCheck",
  data() {
    return {
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
      ruleNameInput: "", // 规则名称
      ruleClassInput: "", //规则类名
      ruleDfnInput: "", // 规则定义
      getDataVal: "电子病历", // 数据库下拉框
      getDataNameVal: "个人基本信息", // 数据表名下拉框
      getStrNameVal: "名称" //字段名下拉框
    };
  },
  methods: {
    // 获取规则名称
    getRuleName() {
      //console.log(this.ruleNameInput);
      if (this.ruleNameInput.trim() == "") {
        this.open("规则名称");
      }
    },
    // 获取规则定义
    getRuleClass() {
      //console.log(this.ruleClassInput);
    },
    // 规则类名
   /* getRuleData(valId) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value == valId;
      });
      //console.log(obj.label);
    },*/
    // 数据表名
   /* getRuleDataName(valId) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value == valId;
      });
      //console.log(obj.label);
    },*/
   /* //字 段 名
    getRuleStrName(valId) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value == valId;
      });
      //console.log(obj.label);
    },*/
    // 规则定义
    getRuleDfn() {
     // console.log(this.ruleDfnInput);
    },
    // 提交
    submitBtn() {
      //console.log(this.ruleNameInput + "-----" + this.ruleClassInput);
    },
    //消息提示
    open(getType) {
      this.$message.error(`${getType}不能为空`);
    }
  },
  components: {
    MTopNav
  }
};
</script>


<style lang="less" scoped>
.addRuleBox {
  position: absolute;
  top: 20px;
  left: 300px;
  line-height: 40px;
  width: 600px;
  /deep/ .ruleCon {
    .el-select {
      width: 100%;
    }
    margin-bottom: 20px;
    display: flex;
    p {
      font-size: 16px;
      width: 100px;
    }
  }
  /deep/ .ruleBtn {
    button {
      display: block;
      margin-right: 20px;
      padding: 10px 30px;
    }
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.el-button {
  display: none;
}
</style>
