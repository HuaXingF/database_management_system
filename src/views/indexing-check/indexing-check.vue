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
                <el-button type="primary" @click="clearInput">重 置</el-button>
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
                            <el-button type="text" size="small" @click="editBtn(scope.$index, tableData)"><i style="font-size: 25px;" class="el-icon-edit" title="编辑"></i></el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                                    type="text"
                                    size="small"
                            ><i style="font-size: 25px;" class="el-icon-delete" title="删除"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <!--fRuleDefine: (...)
            fRuleDes: (...)
            fRuleId: (...)
            fRuleName: (...)
            fRuleType: (...)
            fTableField: (...)
            fTableName: (...)-->
            <!-- 编辑按钮单击进行的页面弹出 -->
            <el-dialog title="编辑数据规则" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules_update" ref="form">
                    <el-form-item label="规则名称" :label-width="formLabelWidth" prop="fRuleName">
                        <el-input v-model="form.fRuleName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规则描述" :label-width="formLabelWidth">
                        <el-input v-model="form.fRuleDes" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库名" :label-width="formLabelWidth" prop="fBaseName">
                        <el-select v-model="form.fBaseName" placeholder="请选择数据库名" @change="selectBaseTab(form.fBaseName,1)">
                            <el-option
                                    v-for="item in ftbBase"
                                    :key="item.index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据表名" :label-width="formLabelWidth"  prop="fTableName">
                        <el-select v-model="form.fTableName" placeholder="请选择数据表名" @change="selectTabFile(form.fTableName,1)">
                            <el-option
                                    v-for="item in ftbTable"
                                    :key="item.index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字 段 名" :label-width="formLabelWidth" prop="fTableField">
                        <el-select v-model="form.fTableField" placeholder="请选择字 段 名">
                            <el-option
                                    v-for="item in ftbFile"
                                    :key="item.index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则定义" :label-width="formLabelWidth" prop="fRuleDefine">
                        <el-input v-model="form.fRuleDefine" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editConfirmBtn">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 点击新增按钮进行页面的弹出 -->
             <!--fRuleType,
            fRuleName,
            fRuleDefine,
            fTableField,
            fTableName,
            fBaseName-->
            <el-dialog title="新增数据规则" :visible.sync="adddialogFormVisible">
                <el-form :model="addForm" :rules="rules_add" ref="addForm">
                    <el-form-item label="规则名称" :label-width="formLabelWidth" prop="fRuleName">
                        <el-input v-model="addForm.fRuleName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="规则描述" :label-width="formLabelWidth">
                        <el-input v-model="addForm.fRuleDes" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库名" :label-width="formLabelWidth" prop="fBaseName">
                        <el-select v-model="addForm.fBaseName" placeholder="请选择数据库名" @change="selectBaseTab(addForm.fBaseName,0)">
                            <el-option
                                    v-for="item in ftbBase"
                                    :key="item.index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据表名" :label-width="formLabelWidth" prop="fTableName">
                        <el-select v-model="addForm.fTableName" placeholder="请选择数据表名" @change="selectTabFile(addForm.fTableName,0)">
                            <el-option
                                    v-for="item in ftbTable"
                                    :key="item.index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字 段 名" :label-width="formLabelWidth" prop="fTableField">
                        <el-select v-model="addForm.fTableField" placeholder="请选择字 段 名">
                            <el-option
                                    v-for="item in ftbFile"
                                    :key="item.index"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规则定义" :label-width="formLabelWidth" prop="fRuleDefine">
                        <el-input v-model="addForm.fRuleDefine" autocomplete="off"></el-input>
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
        update,
        selectAllBase,
        selectBaseTab,
        selectTabFile
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
                ftbBase:[],
                ftbTable:[],
                ftbFile:[],
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
                formLabelWidth: "120px",
                rules_add:{
                    fRuleName: [
                        { required: true, message: "请输入规则名称", trigger: "blur" }
                        //{ validator: validaePass }
                    ],
                    fBaseName: [
                        { required: true, message: "请选择数据库名", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ],
                    fTableField: [
                        { required: true, message: "请选择字段名", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ],
                    fTableName: [
                        { required: true, message: "请选择数据表名", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ],
                    fRuleDefine: [
                        { required: true, message: "请输入规则定义", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ]
                },
                rules_update:{
                    fRuleName: [
                        { required: true, message: "请输入规则名称", trigger: "blur" }
                        //{ validator: validaePass }
                    ],
                    fBaseName: [
                        { required: true, message: "请选择数据库名", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ],
                    fTableField: [
                        { required: true, message: "请选择字段名", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ],
                    fTableName: [
                        { required: true, message: "请选择数据表名", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ],
                    fRuleDefine: [
                        { required: true, message: "请输入规则定义", trigger: "blur" }
                        //{ validator: validaePass2 }
                    ]
                }
            };
        },
        mounted(){
            this.init();
            this.selectAllBase();
        },
        methods: {
            //清空查询条件
            clearInput(){
                this.input=null;
            },
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
                /*if(this.ftbBase.length>0){
                    this.addForm.fBaseName=this.ftbBase[0].value
                }*/
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
               // console.log(this.getRuleData,"777");
                this.form=this.getRuleData
               /* this.form.name = this.getRuleData.ruleName
                this.form.define = this.getRuleData.ruleDefine*/
            },
            // 编辑按钮确定按钮
            editConfirmBtn() {
                //console.log(1);
                this.$refs.form.validate((valid) =>{
                        if(valid){
                            this.$confirm("确认修改这条规则吗？", "提示", {})
                                .then(() => {
                                    console.log(this.form,"0000")
                                    update(this.form).then(({data}) =>{
                                        if(data.status=="200"){
                                            this.$message({
                                                message: '修改成功',
                                                type: 'success'
                                            });
                                            this.init();
                                        }else if(data.status=="400"){
                                            this.$message.error("修改失败")

                                        }
                                    })
                                })

                            this.dialogFormVisible = false;
                        }
                })

            },
            // 新增按钮的确定按钮
            /* fRuleType,
                 fRuleName,
                 fRuleDefine,
                 fTableField,
                 fTableName,
                 fBaseName*/
            addConfirmBtn() {
                this.$refs.addForm.validate((valid) =>{
                    if(valid){
                        this.$confirm("确认新增这条规则吗？", "提示", {})
                            .then(() => {
                                insert(this.addForm).then(({data}) =>{
                                    if(data){
                                        this.$message({
                                            message: '新增成功',
                                            type: 'success'
                                        });
                                        this.init();
                                    }else{
                                        this.$message.error("新增失败")

                                    }
                            })
                            })
                        this.adddialogFormVisible = false;
                    }
                })
            },
            init(){
                //tableData
                selectAll().then(ref =>{
                    this.tableData=ref.data
                })
                //this.selectAllBase();
            },
            //初始化查询所有库
            selectAllBase(){
                this.ftbBase=[]
                selectAllBase().then(({data}) =>{
                    //console.log(data,"666")
                    for(let i=0;i<data.length;i++){
                        this.ftbBase.push({"value":data[i].fBaseName,"index":i})
                    }

                })
            },
            //根据数据库查询表
            selectBaseTab(val,e){
                //console.log(val,"888")
                this.ftbTable=[]
                selectBaseTab(val).then(({data}) =>{
                   // console.log(data,"888")
                    for(let i=0;i<data.length;i++){
                        this.ftbTable.push({"value":data[i].fTableName,"index":i})
                    }
                    if(this.ftbTable.length>0){
                        if(e==0){
                            this.addForm.fTableName=this.ftbTable[0].value
                        }else if(e==1){
                            this.form.fTableName=this.ftbTable[0].value
                        }
                        this.selectTabFile(this.ftbTable[0].value,e);
                    }


                })
            },
            //根据表查询字段
            selectTabFile(val,e){
                this.ftbFile=[]
                selectTabFile(val).then(({data}) =>{
                    console.log(val,e,"888")
                    for(let i=0;i<data.length;i++){
                        this.ftbFile.push({"value":data[i],"index":i})
                    }
                    if(this.ftbFile.length>0){
                        if(e==0){
                            this.addForm.fTableField=this.ftbFile[0].value
                        }else if(e==1){
                            this.form.fTableField=this.ftbFile[0].value
                        }
                    }
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
