<template>
  <!--只允许有一个根节点-->
  <div class="user">
    <el-col class="el-col"> <!-- 头部区域 -->
      <div class="colhead">
        <el-tag>用户管理列表</el-tag>
      </div>
      <el-main>
        <el-input placeholder="" v-model="keywords" style="display:inline-block;width:170px;"></el-input>
        <el-button type="warning" size="small" style="margin-left:7px;" @Search="search()">查询</el-button>
        <el-button type="primary" size="small" @click="addUser">新增</el-button>
      </el-main>
      <el-table :data="tableData" width="100%">
        <!--<el-table-column type="selection"></el-table-column>-->
        <el-table-column type="index" label="序号" width="150" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" width="150" align="center">
          <template scope="scope">
            <p v-if="scope.row.sex=='0'">男</p>
            <p v-if="scope.row.sex=='1'">女</p>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" width="150" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" width="180" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <!--<el-button @click="handleClick(scope.row,0)" icon="el-icon-bottom" type="text" size="medium">详情
            </el-button>-->
            <el-button @click="handleEdit(scope.row,1)" type="primary" size="small">编辑
            </el-button>
            <el-button @click="handleEdit(scope.row,2)" type="danger" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="height:70px;text-align: center;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[5,10,15,20]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalRecords">
        </el-pagination>
      </div>
    </el-col>

    <!-- ----新增/编辑个人信息---- -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="closeDialogAddgsVisible">
      <el-form :model="AddInfo" ref="AddInfo">
        <el-form-item label="用户id" prop="id" hidden>
          <el-input style="display:inline-block;width:33%;" v-model="AddInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="username" required>
          <el-input style="display:inline-block;width:33%;" v-model="AddInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" required>
          <el-input style="display:inline-block;width:33%;" v-model="AddInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="sex" required>
          <el-radio v-model="AddInfo.sex" label="0">男</el-radio>
          <el-radio v-model="AddInfo.sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone" required>
          <el-input style="display:inline-block;width:33%;" v-model="AddInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱" prop="email" required>
          <el-input style="display:inline-block;width:33%;" v-model="AddInfo.email"></el-input>
        </el-form-item>
        <!--<el-form-item label="创建时间" prop="createTime" required>-->
          <!--<el-date-picker style="display:inline-block;width:33%;" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="AddInfo.createTime"></el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="用户地址" prop="address" required>
          <el-input style="display:inline-block;width:33%;" v-model="AddInfo.address"></el-input>
        </el-form-item>
      </el-form> <!-- 按钮确定和取消 -->
      <span slot="footer">
        <el-button type="primary" @click.native="submitForm('AddInfo')">确定</el-button>
        <el-button @click.native="dialogFormVisible = false">取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// 需要使用Vue,需要引入
import Vue from 'vue'
export default {
  props: {
    itemInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      tableData: [],
      dialogFormVisible: false,
      title: '',
      keywords: '',
      page: {
        pageSize: 5, // 每页条数,  默认10条
        pageCurrent: 1, // 第几页
        totalRecords: 0, // 总条数
        totalPages: 0 // 总页数
      },
      viewtitle: '',
      AddInfo: {
        id:'',
        username: '',
        password: '',
        sex: '0',
        phone: '',
        email: '',
        address: ''
      },
      ViewInfo: {
        id:'',
        username: '',
        password: '',
        sex: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return Vue.prototype.$moment(date).format('YYYY-MM-DD')
    },
    // 得到所有的数据---------------
    init: function () {
      let {pageCurrent, pageSize} = this.page
      Vue.axios.get('/bSysUser/list', {
        params: {
          pageCurrent,
          pageSize
        }
      })
        .then(respone => {
          this.page.totalRecords = respone.data.total // 总条数
          const userArray = respone.data.records
          this.tableData = userArray
        })
    },
    // 每页显示多少条数据
    sizeChange (val) {
      this.page.pageSize = val
      this.init()
    },
    // 翻页
    currentChange (val) {
      this.page.pageCurrent = val
      console.log(this.page.pageCurrent)
      this.init()
    },
    // 操作界面 ----------- 新增 -------
    addUser () {
      this.dialogFormVisible = true
      this.title = '新增用户'
    },
    // 保存
    submitForm (AddInfo) {
      const that = this
      that.$refs[AddInfo].validate(valid => {
        if (valid) {
          Vue.axios.post('/bSysUser/save', this.AddInfo).then(res => {
            let {code, msg} = res.data
            if (!code == 0) {
              this.$set(this.AddInfo, {})
              this.init()
              this.dialogFormVisible = false
            } else {
              this.$message.error(msg)
            }
          })
        }
      })
    },
    // 操作界面 ----------- 编辑/删除-------
    handleEdit (row, state) {
      if (state == 1) {
        this.dialogFormVisible = true
        this.title = '编辑用户'
        this.AddInfo.id = row.id
        this.AddInfo.username = row.username
        this.AddInfo.password = row.password
        this.AddInfo.sex = row.sex === 0 ? '男' : '女'
        this.AddInfo.phone = row.phone
        this.AddInfo.email = row.email
        this.AddInfo.address = row.address
      } else if (state == 2) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableItem = row
          Vue.axios.post('/bSysUser/delete', this.tableItem).then(res => {
            let {code, msg} = res.data
            if (!code == 0) {
              this.$set(this.AddInfo, {})
              this.init()
              this.dialogFormVisible = false
            } else {
              this.$message.error(msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      }
    },
    // 关闭或取消弹框-----新增/编辑
    closeDialogAddgsVisible () {
      // element封装的方法,清空模态框的值
      this.$refs.AddInfo.resetFields()
      this.title = ''
      this.viewtitle = ''
      // 初始化addForm中的值
      this.AddInfo = {
        id:'',
        username: '',
        password: '',
        sex: '0',
        phone: '',
        createTime: '',
        address: ''
      },
      this.ViewInfo = {
        id:'',
        username: '',
        password: '',
        sex: '',
        phone: '',
        createTime: '',
        address: ''
      }
    },
    // 操作界面 ----------- 查看 -------
    handleClick (row) {
      this.dialogFormVisible = true
      this.title = '用户详情'
      this.ViewInfo = row
    }

  }
}
</script>
<style scoped>

</style>
