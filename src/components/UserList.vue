<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>检测人员</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box-card">
      <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="180"></el-table-column>
        <el-table-column prop="position" label="地址"></el-table-column>
             <el-table-column
            label="操作"
            min-width="80"
          >
            <template scope="scope">
              <el-button
                size="small"
                @click="handleRowEdit(scope.$index, scope.row)"
              >查看</el-button>
              <!--              <el-button  size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
      </el-table>

      <!--分页-->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination> -->
    </el-card>
    <!--这是一个from表单-->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close='addDialogClosed'>
      <!--内容主题区域-->
      <el-form
        :model="addfrom"
        :rules="addfromRules"
        ref="addfromRef"
        label-width="70px"

      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addfrom.name"></el-input>
        </el-form-item>
        <el-form-item label="健康码" prop="hm">
          <el-input v-model="addfrom.hm
          "></el-input>
        </el-form-item>
          <el-form-item label="住址" prop="position">
          <el-input  type="textarea"  v-model="addfrom.position
          "></el-input>
        </el-form-item>
          <el-form-item label="电话" prop="phone">
          <el-input v-model="addfrom.phone
          "></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
 
  data() {
     var checkMobile=(rule,value,cb)=>{
         var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
         if(myreg.test(value)){
           return cb()
         }
         cb(new Error('请输入合法的手机号'))
     }
    return {
      addfrom:{
        name:'',
        hm:'',
        position:'',
        phone:''

      },
      addfromRules:{
       name:[
           { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2到  10个字符', trigger: 'blur' }
        ],
            position:[
           { required: true, message: '请输入用户地址', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2到  50个字符', trigger: 'blur' }
        ],
        hm:[
          { required: true, message: '工号不能为空'},
        //  { type: 'number', message: '工号必须为数字值'}
        ],
        phone:[
          { required: true, message: '请输入用户电话', trigger: 'blur' },
            {validator:checkMobile,trigger:'blur' },
        ]
      },
      dialogVisible: false,
      //当前的页数
      pagenum: 11,
      //当前显示几条数据
      pagesize: 1,
      total: 50,
      tableData: []
    };
  },
  methods: {
    handleSizeChange(newsize) {
      console.log(newsize);
      this.pagenum = newsize;
      //调用方法
    },
    handleCurrentChange(newpage) {
      console.log(newpage);
      this.pagesize = newpage;
      //调用方法
    },
    addDialogClosed(){
      this.$refs.addfromRef.resetFields()
    },
    addUser(){
      this.$refs.addfromRef.validate((valid) => {
      if(!valid) return

      //可以发送起用户的网络请求
      this.axios.post('http://129.226.50.167:3000/user',this.addfrom).then(response=>{
          if (response.status === 201) {
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
               this.dialogVisible=false
               //重新刷新一下列表
               this.getUserData();
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败,请检查相关内容"
                });
              }
      
      })
      })
    },
       handleRowEdit(index, row) {
      console.log(row);
      this.$router.push({ name: "informationreg", query: { hm: row.hm} });
    },
    getUserData(){
     this.axios.get('http://129.226.50.167:3000/user').then(response=>{
       console.log(response.data)
       if(response.status==200){
         this.tableData=response.data
       }
     })
    }
  },
 mounted(){
   this.getUserData();
  }
};
</script>>
<style lang="less" scoped>
.el-button {
  margin: 10px 10px;
}
</style>