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
        <el-table-column prop="date" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="temperature" label="测试温度" width="180"></el-table-column>
        <el-table-column prop="date" label="测试时间" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addfrom.username"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="num">
          <el-input v-model="addfrom.num
          "></el-input>
        </el-form-item>
          <el-form-item label="住址" prop="address">
          <el-input  type="textarea"  v-model="addfrom.address
          "></el-input>
        </el-form-item>
          <el-form-item label="电话" prop="mobile">
          <el-input v-model="addfrom.mobile
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
        username:'',
        num:'',
        address:'',
        mobile:''

      },
      addfromRules:{
        username:[
           { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2到  10个字符', trigger: 'blur' }
        ],
            address:[
           { required: true, message: '请输入用户地址', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2到  50个字符', trigger: 'blur' }
        ],
        num:[
          { required: true, message: '工号不能为空'},
         { type: 'number', message: '工号必须为数字值'}
        ],
        mobile:[
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          temperature: "36"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          temperature: "36"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          temperature: "38"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          temperature: "37"
        }
      ]
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
      // this.axios.post().then(respone=>{
      //     if (response.data.errno === 0) {
      //           this.$message({
      //             type: "success",
      //             message: "保存成功"
      //           });
      //          this.dialogVisible=false
      //          //重新刷新一下列表
      //         } else {
      //           this.$message({
      //             type: "error",
      //             message: "保存失败,请检查相关内容"
      //           });
      //         }
      // })
      })
    },
       handleRowEdit(index, row) {
      console.log(row);
      this.$router.push({ name: "informationreg", query: { id: row.id } });
    },
  }
};
</script>>
<style  scoped>
.el-button {
  margin: 10px 10px;
}
</style>