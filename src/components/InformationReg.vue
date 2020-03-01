<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>检测人员</el-breadcrumb-item>
      <el-breadcrumb-item>温度检测</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box-card">
      <div class='divback'><el-button type='primary' @click='goback'>返回</el-button> </div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%" border="">
        <el-table-column
          prop="createdAt"
          label="日期"    
         
        ></el-table-column>
        <el-table-column prop="temp" label="温度（℃）" ></el-table-column>
        <el-table-column
          prop="tag"
          label="是否正常"
   
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag >= 37.3 ? 'danger' : 'success'"
              disable-transitions
            >{{scope.row.tag >=37.3 ?'异常':'正常'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hm:'',
      tableData:[]
    };
  },
  methods: {
     goback(){
         this.$router.push({
        name:'userlist'
      });
     },
     getpersondata(){
        this.axios.get('http://129.226.50.167:3000/temp',this.hm).then(response=>{
          if(response.status==200){
            this.tableData=response.data
          }
        })
     }
  },
  mounted(){
     this.hm = this.$route.query.hm|| '';
     this.getpersondata();
  }
};
</script>>
<style lang="less" scoped>
.divback{
 float: right;
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
}
</style>