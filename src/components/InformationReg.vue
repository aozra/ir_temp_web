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
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"    
          width="180"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" ></el-table-column>
        <el-table-column
          prop="tag"
          label="是否正常"
          width="100"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag >= 37 ? 'danger' : 'success'"
              disable-transitions
            >{{scope.row.tag >=37 ?'异常':'正常'}}</el-tag>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag:36
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: 37
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: 36
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: 37
        }
      ]
    };
  },
  methods: {
     
  }
};
</script>>
<style lang="less" scoped>
</style>