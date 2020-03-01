<template>
  <el-container class="home-container">
   <!--头部-->
    <el-header>
      <div class="titleicon">
        <img src="../assets/logo.png" alt />
        <span>体温监管检测系统</span>
      </div>
      <el-button type="‘info‘">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'250px'">
          <div class='toggle-button' @click='toggle'>|||</div>
          <!--侧边栏菜单-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse='isCollapse'
          :collapse-transition="false"
          router
          :default-active="this.$router.path"  
         
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>检测人员</span>
            </template>
           <el-menu-item index="/userlist">人员列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--中间-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
    data (){
        return{
        isCollapse:false
        }
    },
    //点击按钮切换菜单的折叠与展开
    methods:{
        toggle(){
          this.isCollapse=!this.isCollapse
        }
    }
};
</script>>
<style land='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d42;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.titleicon {
  height: 60px;
  display: flex;
  align-items: center;
}
.titleicon img {
  height: 60px;
}
.titleicon span {
  margin-left: 10px;
}
.el-aside {
  background-color: #333744;
 
}
 .el-menu{
      border-right: none;
  }
.el-main {
  background-color: #eaedf1;
    padding: 0;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;

}
</style>