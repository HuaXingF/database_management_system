<template>
    <el-col :span="24" class="indexing-check">
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
            <el-col :span="5">
                <p>数据规则列表</p>
            </el-col>
            <el-col :span="9">
                请输入关键字查询：
                <el-input placeholder="请输入查询名称" v-model="input" clearable></el-input>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" @click="selectRule">查 询</el-button>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" @click="addRule">新增规则</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :sm="24">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        :cell-style="cellStyle"
                        :header-cell-style="rowClass"
                >
                    <el-table-column prop="fRuleName" label="规则名称" width="180"></el-table-column>
                    <el-table-column prop="fRuleDes" label="规则描述" width="180"></el-table-column>
                    <el-table-column prop="fTableName" label="规则对应表名"></el-table-column>
                    <el-table-column prop="fTableField" label="规则对应字段名"></el-table-column>
                    <el-table-column prop="fRuleDefine" label="规则定义"></el-table-column>
                    <el-table-column prop="ruleOpera" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editBtn(scope.$index, tableData)">编辑</el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                                    type="text"
                                    size="small"
                            >移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <!-- 编辑按钮单击进行的页面弹出 -->
            <el-dialog title="编辑数据规则" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="规则名称" :label-width="formLabelWidth">
                        <el-input v-model="form.fRuleDefine" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规则描述" :label-width="formLabelWidth">
                        <el-input v-model="form.fRuleDes" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库名" :label-width="formLabelWidth">
                        <el-select v-model="form.dataName" placeholder="请选择数据库名">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据表名" :label-width="formLabelWidth">
                        <el-select v-model="form.dataTableName" placeholder="请选择数据表名">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字 段 名" :label-width="formLabelWidth">
                        <el-select v-model="form.strName" placeholder="请选择字 段 名">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则定义" :label-width="formLabelWidth">
                        <el-input v-model="form.define" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editConfirmBtn">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 点击新增按钮进行页面的弹出 -->
            <el-dialog title="编辑数据规则" :visible.sync="adddialogFormVisible">
                <el-form :model="addForm">
                    <el-form-item label="规则名称" :label-width="formLabelWidth">
                        <el-input v-model="addForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规则类别" :label-width="formLabelWidth">
                        <el-input v-model="addForm.class" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库名" :label-width="formLabelWidth">
                        <el-select v-model="addForm.dataName" placeholder="请选择数据库名">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据表名" :label-width="formLabelWidth">
                        <el-select v-model="addForm.dataTableName" placeholder="请选择数据表名">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字 段 名" :label-width="formLabelWidth">
                        <el-select v-model="addForm.strName" placeholder="请选择字 段 名">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则定义" :label-width="formLabelWidth">
                        <el-input v-model="addForm.define" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="adddialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addConfirmBtn">确 定</el-button>
                </div>
            </el-dialog>
        </el-row>
    </el-col>
</template>

<script>
    import MTopNav from "@/components/m-topNav/m-topNav";
    import {
        selectAll,
        selectByRuleName,
        insert,
        deleteTabRule,
        update
    } from "@/api/indexing-check"
    export default {
        watch: {
            input(val) {
              if(val==null || val==""){
                  //console.log(val)
                  this.init();
              }else{
                  //this.input()
                  this.selectRule(val);
              }
            }
        },
        name: "indexingCheck",
        data() {
            return {

                tableData: [],
                input: "",
                getRuleData: null,   //  保存tableData中数据
                dialogFormVisible: false,
                adddialogFormVisible: false,
                // 新增按钮对应的form对象
                addForm: {
                    name: "", //规则名称
                    class: "", // 规则类别
                    dataName: "电子病历", // 数据库名
                    dataTableName: "个人基本信息", // 数据表名
                    strName: "名称", // 字 段 名
                    define: "", // 规则定义
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                },
                // 编辑按钮对应的form对象
                form: {
                    name: "", //规则名称
                    class: "", // 规则类别
                    dataName: "电子病历", // 数据库名
                    dataTableName: "个人基本信息", // 数据表名
                    strName: "名称", // 字 段 名
                    define: "", // 规则定义
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                },
                formLabelWidth: "120px"
            };
        },
        mounted(){
            this.init();
        },
        methods: {
            cellStyle() {
                return "text-align:center";
            },
            rowClass() {
                return "text-align:center";
            },
            selectRule() {
                selectByRuleName(this.input).then(({data}) =>{
                    console.log(data)
                    this.tableData=data
                })
            },
            // 新增按钮功能实现
            addRule() {
                // this.$router.push({ path: "/SystemAddRule" });
                this.adddialogFormVisible = true
            },
            // 删除按钮功能实现
            deleteRow(index, rows) {
                let id=rows[index].fRuleId
                this.$confirm("确认删除名称为:"+rows[index].fRuleName+"的这条规则吗？", "提示", {})
                    .then(() => {
                        deleteTabRule(id).then(({data}) =>{
                            if(data.status=="200"){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.init();
                            }else if(data.status=="400"){
                                this.$message.error("删除失败")

                            }
                        })
                        //rows.splice(index, 1);
                    })
                    .catch(() => {
                        //console.log("取消");
                    });
            },
            // 点击编辑按钮
            editBtn(index, rows) {
                this.dialogFormVisible = true
                console.log(rows);
                this.getRuleData = rows.find((item, i) => {
                    return index == i;
                });
                console.log(this.getRuleData);
                this.form.name = this.getRuleData.ruleName
                this.form.define = this.getRuleData.ruleDefine
            },
            // 编辑按钮确定按钮
            editConfirmBtn() {
                console.log(1);
                this.dialogFormVisible = false;
            },
            // 新增按钮的确定按钮
            addConfirmBtn() {
                this.adddialogFormVisible = false;
            },
            init(){
                //tableData
                selectAll().then(ref =>{
                    console.log(ref.data)
                    this.tableData=ref.data
                })
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
    .el-row {
        /deep/ .el-input {
            width: 60%;
        }
    }
    .el-select {
        width: 100%;
    }
</style>
