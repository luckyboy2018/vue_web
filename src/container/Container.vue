<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="../assets/img/welcome.png"
               :width="isCollapse ? '230' : '230'"
               height="60" />
        </div>
        <div>
          <!-- 看板管理 -->
          <el-menu default-active="1-2-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">看板管理</span>
              </template>
              <el-submenu index="1-1">
                <span slot="title">教师看板</span>
                <el-menu-item index="1-1-1"><router-link to="/">教师看板</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <span slot="title">学生看板</span>
                <el-menu-item index="1-2-1"><router-link to="/">学生看板</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <span slot="title">年级看板</span>
                <el-menu-item index="1-3-1"><router-link to="/">年级看板</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-4">
                <span slot="title">班级看板</span>
                <el-menu-item index="1-4-1"><router-link to="/">班级看板</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-5">
                <span slot="title">宿舍看板</span>
                <el-menu-item index="1-5-1"><router-link to="/">宿舍看板</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>
            <!--用户管理-->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-submenu index="1-0">
                <span slot="title">管理员管理</span>
                <el-menu-item index="1-0-1"><router-link to="/user">管理员管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-1">
                <span slot="title">教师管理</span>
                <el-menu-item index="1-1-1"><router-link to="/teacher">教师管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <span slot="title">学生管理</span>
                <el-menu-item index="1-2-1"><router-link to="/student">学生管理</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>
            <!--档案管理-->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">档案管理</span>
              </template>
              <el-submenu index="1-1">
                <span slot="title">教师档案</span>
                <el-menu-item index="1-1-1"><router-link to="/">教师档案</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <span slot="title">学生档案</span>
                <el-menu-item index="1-2-1"><router-link to="/">学生档案</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <span slot="title">图书档案</span>
                <el-menu-item index="1-3-1"><router-link to="/">图书档案</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-4">
                <span slot="title">设施档案</span>
                <el-menu-item index="1-4-1"><router-link to="/">设施档案</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-5">
                <span slot="title">宿舍档案</span>
                <el-menu-item index="1-5-1"><router-link to="/">宿舍档案</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>
            <!--<el-menu-item index="4">-->
              <!--<span slot="title"><router-link to="/">配置管理</router-link></span>-->
            <!--</el-menu-item>-->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">配置管理</span>
              </template>
              <el-submenu index="1-1">
                <span slot="title">教室管理</span>
                <el-menu-item index="1-1-1"><router-link to="/teachermanage">教室管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <span slot="title">宿舍管理</span>
                <el-menu-item index="1-2-1"><router-link to="/studentmanage">宿舍管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <span slot="title">年级管理</span>
                <el-menu-item index="1-3-1"><router-link to="/grademanage">年级管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-4">
                <span slot="title">班级管理</span>
                <el-menu-item index="1-4-1"><router-link to="/classmanage">班级管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-5">
                <span slot="title">学科管理</span>
                <el-menu-item index="1-5-1"><router-link to="/subjectmanage">学科管理</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="1-6">
                <span slot="title">成绩管理</span>
                <el-menu-item index="1-6-1"><router-link to="/recordemanage">成绩管理</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;"
               @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
          <!-- 我是样例菜单 -->
          <el-menu default-active="1"
                   class="el-menu-demo tab-page"
                   mode="horizontal"
                   @select="handleSelect"
                   active-text-color="#409EFF">
            <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/">产品</router-link></el-menu-item>
            <el-submenu index="3">
              <template slot="title">工作台</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-submenu index="3-2">
                <template slot="title">选项2</template>
                <el-menu-item index="1-2-1"><router-link to="/">选项2.1</router-link></el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="4"><router-link to="/">帮助中心</router-link></el-menu-item>
            <el-menu-item index="5"><router-link to="/">关于我们</router-link></el-menu-item>
          </el-menu>
          <div class="app-header-userinfo">
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                     :width="isCollapse ? '25' : '25'" height="25">
                <!--{{ username }}-->
                <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided>我的信息</el-dropdown-item>
                <el-dropdown-item divided>密码设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Container',
  data () {
    return {
      username: '',
      isCollapse: false
    }
  },
  methods: {
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user')
          this.$router.push('/login')
        })
        .catch(() => { })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted: function () {
    let user = sessionStorage.getItem('user')
    if (user) {
      this.username = user
    }
  }
}
</script>

<style>
  .router-link-active {
    text-decoration: none;
  }
</style>
