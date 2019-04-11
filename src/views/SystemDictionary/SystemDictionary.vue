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
    </MTopNav>

    <el-row :gutter="50">
      <el-col :span="5">
        <p>字典规范列表</p>
      </el-col>
      <el-col :span="9">
        请输入关键字查询：
        <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="clearInput()">重 置</el-button>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="addRule">新增字典</el-button>
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
          <el-table-column prop="category" label="字典类别" width="160"></el-table-column>
          <el-table-column prop="name" label="字典项" width="160"></el-table-column>
          <el-table-column prop="code" label="字典编码"></el-table-column>
          <el-table-column prop="standard" label="字典规范"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="notes" label="字典描述"></el-table-column>
          <el-table-column prop="ruleOpera" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editBtn(scope.$index, scope.row)"><i style="font-size: 25px;" class="el-icon-edit" title="编辑"></i></el-button>
              <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="text"
                      size="small"
              ><i style="font-size: 25px;" class="el-icon-delete" title="删除"></i></el-button>
              <el-button type="text" size="small" @click="addBtn(scope.$index, scope.row)" ><i style="font-size: 25px;" class="el-icon-circle-plus" title="增加扩展项"></i></el-button>
              <el-button type="text" size="small" @click="selectBtn(scope.$index, scope.row)"><i style="font-size: 25px;" class="el-icon-view" title="查看扩展项"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next"
                         @current-change="handleCurrentChange"
                         :page-size="10"
                         :total="total"
                         style="float:right;">
          </el-pagination>
        </el-col>
      </el-col>

      <!-- 编辑按钮单击进行的页面弹出 -->
      <el-dialog title="编辑字典" :visible.sync="dialogFormVisible">
        <el-form :model="editForm" :rules="rules" ref="editForm">
          <el-form-item label="字典类别" :label-width="formLabelWidth" prop="category">
            <el-input v-model="editForm.category" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典项" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典编码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="editForm.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典规范" :label-width="formLabelWidth">
            <el-input v-model="editForm.standard" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典描述" :label-width="formLabelWidth">
            <el-input v-model="editForm.notes" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"  @click="editConfirmBtn">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 点击新增按钮进行页面的弹出 -->
      <el-dialog title="新增字典" :visible.sync="adddialogFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item label="字典类别" :label-width="formLabelWidth" prop="category">
            <el-input v-model="addForm.category" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典项" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典编码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="addForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典规范" :label-width="formLabelWidth">
            <el-input v-model="addForm.standard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典描述" :label-width="formLabelWidth">
            <el-input v-model="addForm.notes" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adddialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addConfirmBtn">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="新增扩展项" :visible.sync="addFormVisible">
        <el-form :model="addForm_kz" :rules="rules_kz" ref="addForm_kz">
          <el-input v-model="addForm_kz.dictionaryId" autocomplete="off" v-show="flagFlag"></el-input>
          <el-form-item label="扩展名称" :label-width="formLabelWidth" >
            <el-input v-model="addForm_kz.extensionName" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="扩展取值" :label-width="formLabelWidth" prop="extensionCode">
            <el-input v-model="addForm_kz.extensionCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="映射库" :label-width="formLabelWidth">
            <el-input v-model="addForm_kz.extensionDatabase" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="映射表名" :label-width="formLabelWidth">
            <el-input v-model="addForm_kz.extensionTable" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="映射表字段" :label-width="formLabelWidth">
            <el-input v-model="addForm_kz.extensionField" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insert_kz">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑扩展项" :visible.sync="editFormVisible">
        <el-form :model="editForm_kz" :rules="rules_kz" ref="editForm_kz">
          <el-input v-model="editForm_kz.dictionaryId" autocomplete="off" v-show="flagFlag"></el-input>
          <el-form-item label="扩展名称" :label-width="formLabelWidth">
            <el-input v-model="editForm_kz.extensionName" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="扩展取值" :label-width="formLabelWidth" prop="extensionCode">
            <el-input v-model="editForm_kz.extensionCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="映射库" :label-width="formLabelWidth">
            <el-input v-model="editForm_kz.extensionDatabase" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="映射表名" :label-width="formLabelWidth">
            <el-input v-model="editForm_kz.extensionTable" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="映射表字段" :label-width="formLabelWidth">
            <el-input v-model="editForm_kz.extensionField" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update_kz" :loading="editLoading">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="扩展项列表" :visible.sync="selectFormVisible">
        <el-table
                :data="selectForm_kz"
                ref="selectForm_kz"
                border
                style="width: 100%"
                :cell-style="cellStyle"
                :header-cell-style="rowClass"
        >
          <!--<el-table-column prop="extensionName" label="扩展名称" width="160"></el-table-column>-->
          <el-table-column prop="extensionCode" label="扩展取值" width="120"></el-table-column>
          <el-table-column prop="extensionDatabase" label="映射库" width="120"></el-table-column>
          <el-table-column prop="extensionTable" label="映射表名" width="120"></el-table-column>
          <el-table-column prop="extensionField" label="映射表字段" width="120"></el-table-column>
          <el-table-column prop="ruleOpera" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editBtn_kz(scope.$index, scope.row)"><i style="font-size: 25px;" class="el-icon-edit" title="编辑"></i></el-button>
              <el-button
                      @click.native.prevent="delete_kz(scope.$index, scope.row)"
                      type="text"
                      size="small"
              ><i style="font-size: 25px;" class="el-icon-delete" title="删除"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-row>
  </el-col>
</template>

<script>
import MTopNav from "@/components/m-topNav/m-topNav"
import {
  queryPage,
  queryPage1,
  insert,
  updateById,
  deleteById,
  insertById,
  queryByDictionaryId,
  deleteById_kz,
  updateById_kz
} from "@/api/SystemDictionary"

export default {
  name: "SystemDictionary",
  watch: {
    input(val) {
      if (val==null || val==""){
        this.init()
      } else {
        this.getByName()
      }
    }
  },
  data() {
    return {
      flagFlag: false,
      tableData: [],
      input: "",
      // 保存tableData中数据
      getRuleData: null,   
      dialogFormVisible: false,
      adddialogFormVisible: false,
      // 新增扩张项页面
      addFormVisible: false,
      // 新增扩张项页面
      editFormVisible: false,
      // 扩张项集合页面
      selectFormVisible:false,
      // 新增按钮对应的form对象
      addForm: {},
      // 扩展项
      addForm_kz:{},
      // 编辑扩展项
      editForm_kz: {},
      // 扩展项集合
      selectForm_kz:[],
      rules: {
        category: [
          { required: true, message: "请输入字典名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入字典项", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入字典编码", trigger: "blur" }
        ]
      },
      rules_kz: {
        extensionCode:[
          { required: true, message: "请输入扩展取值", trigger: "blur" }
        ]
      },
      // 编辑按钮对应的editForm对象
      editForm: {},
      formLabelWidth: "120px",
      total: 0,
      page: 1,
      pageNum : 1,
      pageSize : 10,
      editLoading: false,
      word:""
    }
  },
  methods: {
    //清空条件查询
    clearInput(){
      this.input = null
    },
    cellStyle() {
      return "text-align:center"
    },
    rowClass() {
      return "text-align:center"
    },
    //分页所需
    handleCurrentChange(val) {
      this.page = val
      let keyword = this.filters.name;
      if (keyword == null || keyword == "") {
        this.init(this.page)
      } else {
        this.getByName(this.page)
      }
    },
    //根据字典查询
    getByName() {
      let obj = {
        "pageNum" : this.pageNum, 
        "pageSize" : this.pageSize, 
        "category" : this.input.trim()
      }
      queryPage1(obj).then(({data}) => {
        this.tableData = data.rows
        this.total = data.total
      })
    },
    // 新增按钮功能实现
    addRule() {
      this.adddialogFormVisible = true
    },
    // 删除按钮功能实现
    deleteRow(index, rows) {
      this.$confirm('确认删除该记录及扩展数据吗？', '提示', {}).then(() => {
        deleteById(rows.id).then(({data}) => {
          if(data){
            this.$message({
              message:'删除成功',
              type:'success'
            })
            this.init()
          } else {
            this.$message.error("删除失败")
          }
        })
      })
    },
    //扩展项显示
    addBtn(index, rows) {
      this.addFormVisible = true
      this.addForm_kz.dictionaryId = rows.id
      this.addForm_kz.extensionName = rows.category + "-" + rows.name
    },
    //编辑扩展项显示
    editBtn_kz(index, rows) {
      this.editFormVisible = true
      this.editForm_kz= rows
      this.editForm_kz.extensionName = this.word
    },
    // 扩展项编辑按钮确定按钮
    update_kz() {
      this.$refs.editForm_kz.validate((valid) => {
        if(valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            updateById_kz(this.editForm_kz).then(({data}) => {
              this.editFormVisible = false
              this.editLoading = false
              if(data){
                this.$message({
                  message:'修改成功',
                  type:'success'
                })
                this.selectBtn_init(this.editForm_kz.dictionaryId)
              } else {
                this.$message.error("修改失败");
              }
            })
          })
        }
      })
    },
    //扩张项保存
    insert_kz(){
      this.$refs.addForm_kz.validate((valid) => {
        if(valid) {
          insertById(this.addForm_kz).then(({data}) => {
            if (data) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.addFormVisible = false
              this.addForm_kz = {}
              this.init()
            } else {
              this.$message.error("保存失败")
            }
          })
        }
      })
    },
    // 扩展项删除按钮功能实现
    delete_kz(index, rows) {
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        deleteById_kz(rows.id).then(({data})=>{
          if(data){
            this.$message({
              message:'删除成功',
              type:'success'
            })
            this.selectBtn_init(rows.dictionaryId)
          } else {
            this.$message.error("删除失败")
          }
        })
      })
    },
    selectBtn_init(dictionaryId){
      queryByDictionaryId(dictionaryId).then(({data})=>{
        this.selectForm_kz = data
        this.selectFormVisible = true
      })
    },
    //扩展项查询
    selectBtn(index, rows){
      this.word = rows.category + "-" + rows.name
      queryByDictionaryId(rows.id).then(({data})=>{
        this.selectForm_kz = data
        this.selectFormVisible = true
      })
    },
    // 点击编辑按钮
    editBtn(index, rows) {
      this.dialogFormVisible = true
      this.editForm = rows
    },
    // 编辑按钮确定按钮
    editConfirmBtn() {
      this.$refs.editForm.validate((valid) => {
        if(valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            updateById(this.editForm).then(({data}) => {
              this.dialogFormVisible = false
              if(data){
                this.$message({
                  message:'修改成功',
                  type:'success'
                })
                this.init()
              } else {
                this.$message.error("修改失败")
              }
            })
          })
        }
      })
    },
    // 新增按钮的确定按钮
    addConfirmBtn() {
      this.$refs.addForm.validate((valid) => {
        if(valid) {
          insert(this.addForm).then(({data}) => {
            if (data) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.adddialogFormVisible = false
              this.init()
            } else {
              this.$message.error("保存失败")
            }
          })
        }
      })
    },
    init(){
      let obj = {
        "pageNum" : this.pageNum, 
        "pageSize" : this.pageSize
      }
      queryPage(obj).then(({data}) => {
        this.tableData = data.rows
        this.total = data.total
      })
    }
  },
  mounted() {
    this.init()
  },
  components: {
    MTopNav
  }
}
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
