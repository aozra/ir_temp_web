<template>
  <div class="flex">
    <div id="myChart6" :style="{width: '480px', height: '300px'}"></div>
    <div id="myChart2" :style="{width: '480px', height: '300px'}"></div>
    <div id="myChart3" :style="{width: '480px', height: '300px'}"></div>
    <div id="myChart5" :style="{width: '480px', height: '300px'}"></div>
    <div id="myChart1" :style="{width: '480px', height: '300px'}"></div>
    <el-card class="box-card">
        <div class='title'>最新体温检测人员</div>
      <el-table :data="tableData" stripe border @row-click="rowClick">
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="temp" label="测试温度">
          <template slot-scope="scope">
            <span :style="{ color: scope.row.temp >37.3? '#ED3F14' : '#ccc' }">{{ scope.row.temp }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="测试时间" >
            <template slot-scope="scope">{{scope.row.createdAt | date }}</template>
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
            :total="total">
      </el-pagination>-->
    </el-card>
  </div>
</template>>
<script>
import echarts from "echarts";
import { Howl } from "howler";
import dayjs from "dayjs";

// import func from '../../vue-temp/vue-editor-bridge'
export default {
  name: "hello",
  data() {
    return {
      dialogVisible: false,
      isFirst: true,
      lastTimeLength: 0,
        soundIsOn:false,
        soundtime:0,
      time: 0,
      //当前的页数
      pagenum: 11,
      //当前显示几条数据
      pagesize: 1,
      total: 50,
      temperature: 37,
      temperatureData: [],
      temperatureData24: [],
      temperatureData48: [],
      temperatureData72: [],
      temperatureData96: [],
      temperatureData120: [],
      temperatureData144: [],
      temperatureData168: [],
      overTemperatureData: [],
      tableData: [
        {
          createdAt: "8:20",
          userName: "王小虎",
          temp: "36"
        },
        {
          createdAt: "8:30",
          userName: "王小虎",
          temp: "36"
        },
        {
          createdAt: "8:40",
          userName: "王小虎",
          temp: "38"
        }
      ],
      msg: "Welcome to Your Vue.js App"
    };
  },
   filters: {
    date(val) {
      // 过滤器过滤时间格式
      return dayjs(val).format("HH:mm");
    }
  },
  created() {
    this.updateTable();
    this.getPeopleList();
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      that.drawLine1();
      that.drawLine2();
      that.drawLine3();
      that.drawLine5();
      that.drawLine6();
    }, 400);
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    drawLine1() {
      let that = this;
      that.axios.get("http://47.97.251.68:3000/temp").then(res => {
        that.temperatureData = res.data;
        that.temperatureData.reverse();
        //日期可读化
        this.temperatureData.map(
          item => (item.createdAt = item.createdAt.slice(11, 19))
        );
        console.log("that.temperatureData", that.temperatureData);
        //
        let temptime = [];
        let temptem = [];
        let tempshow = that.temperatureData.filter(function(item) {
          return item.userName == that.temperatureData[0].userName;
        });
        console.log("tempshow", tempshow);
        tempshow.map(item => {
          temptime.push(item.createdAt);
          temptem.push(item.temp);
        });

        console.log("temptime", temptime);
        console.log("temptem", temptem);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("myChart1"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "个人体温折线"
          },
          xAxis: {
            type: "category",
            data: temptime
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: temptem,
              type: "line"
            }
          ]
        });
      });
    },
    drawLine2() {
      let a, b, c, d, e, f, g;
      a = this.caclOverTemp(this.temperatureData24);
      b = this.caclOverTemp(this.temperatureData48);
      c = this.caclOverTemp(this.temperatureData72);
      d = this.caclOverTemp(this.temperatureData96);
      e = this.caclOverTemp(this.temperatureData120);
      f = this.caclOverTemp(this.temperatureData144);
      g = this.caclOverTemp(this.temperatureData168);
      a = a[1] / (a[0] + a[1]);
      b = b[1] / (b[0] + b[1]);
      c = c[1] / (c[0] + c[1]);
      d = d[1] / (d[0] + d[1]);
      e = e[1] / (e[0] + e[1]);
      f = f[1] / (f[0] + f[1]);
      g = g[1] / (g[0] + g[1]);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "测量合格率折线"
        },
        xAxis: {
          type: "category",
          data: ["1天前", "2天前", "3天前", "4天前", "5天前", "6天前", "7天前"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [a, b, c, d, e, f, g],
            type: "line"
          }
        ]
      });
    },
    drawLine3() {
      let a, b, c, d, e, f, g;
      a = this.caclOverTemp(this.temperatureData24);
      b = this.caclOverTemp(this.temperatureData48);
      c = this.caclOverTemp(this.temperatureData72);
      d = this.caclOverTemp(this.temperatureData96);
      e = this.caclOverTemp(this.temperatureData120);
      f = this.caclOverTemp(this.temperatureData144);
      g = this.caclOverTemp(this.temperatureData168);

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "体温异常个数统计"
        },
        tooltip: {},
        xAxis: {
          data: ["1天前", "2天前", "3天前", "4天前", "5天前", "6天前", "7天前"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [a[0], b[0], c[0], d[0], e[0], f[0], g[0]]
          }
        ]
      });
    },
    drawLine5() {
        console.log('我要的东西',this.temperatureData24)
      this.temperatureData24.map(function(item) {
        item.createdAt = parseInt(new Date(item.createdAt).toUTCString().slice(17, 19))
        //item.createdAt = Number(item.createdAt);
      });
      // 基于准备好的dom，初始化echarts实例
      let data = [];
      this.temperatureData24.map(item => {
        let tem = [];
        tem[0] = item.createdAt;
        tem[1] = item.temp;
        data.push(tem);
        tem = null;
      });
      console.log("data", data);
      var myChart = echarts.init(document.getElementById("myChart5"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "体温分布散点"
        },
        xAxis: {
          scale: true
        },
        yAxis: {
          scale: true
        },
        series: [
          {
            type: "scatter",
            data: data
          }
        ]
      });
    },
    drawLine6() {
      //选出体温异常的人
      let overNumber = this.caclOverTemp(this.temperatureData24)[0];
      let notoverNumber = this.caclOverTemp(this.temperatureData24)[1];
      var myChart = echarts.init(document.getElementById("myChart6"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "今日测量通过率"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["体温异常", "体温正常"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: overNumber, name: "体温异常" },
              { value: notoverNumber, name: "体温正常" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    rowClick(row) {
      console.log(row)
    console.log('rowClick里的this.temperatureData',this.temperatureData)
        //日期可读化
        //如果，等于数字
    if(isNaN(this.temperatureData[0].createdAt) == false){
        this.temperatureData.map(function(item){
            item.createdAt = (new Date(item.createdAt)).toUTCString().slice(17,22)
        })   
    }
    this.temperatureData.map(item=> item.createdAt.slice(11,19))
        console.log('this.temperatureData',this.temperatureData)
        //
      let temptime = [];
      let temptem = [];
      let tempshow = this.temperatureData.filter(function(item) {
        return item.userName == row.userName;
      });
      console.log("tempshow", tempshow);
      tempshow.map(item => {
        temptime.push(item.createdAt);
        temptem.push(item.temp);
      });

      console.log("temptime", temptime);
      console.log("temptem", temptem);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "个人体温折线"
        },
        xAxis: {
          type: "category",
          data: temptime
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: temptem,
            type: "line"
          }
        ]
      });
    },
    getPeopleList() {
      this.getPeopleList1();
      this.getPeopleList2();
    },
    async getPeopleList1() {
      const res = await this.axios.get("http://47.97.251.68:3000/temp");

      this.temperatureData = res.data;
      
      this.temperatureData.reverse();
      //取
      this.temperatureData.map(
        item => (item.createdAt = new Date(item.createdAt).getTime())
      );
      console.log("this.temperatureData", this.temperatureData);
      //选出距今24小时。。的人的信息
      let time24 = this.temperatureData[0].createdAt - 86400000;
      console.log("111", time24);
      var that = this;
      // this.temperatureData24 = this.temperatureData.filter(item=>{
      //         item.createdAt > time24 && item.createdAt < this.temperatureData[0].createdAt
      //     })
      this.temperatureData24 = this.temperatureData.filter(function(item) {
        return (
          item.createdAt > time24 &&
          item.createdAt <= that.temperatureData[0].createdAt
        );
      });
      console.log("111", this.temperatureData24);
      let time48 = time24 - 86400000;
      // this.temperatureData48 = this.temperatureData.filter(item=>{
      //         item.createdAt > time48 && item.createdAt < time24
      //     })
      console.log("数据", this.temperatureData);
      this.temperatureData48 = this.temperatureData.filter(function(item) {
        return item.createdAt > time48 && item.createdAt < time24;
      });
      console.log("222", this.temperatureData48);
      let time72 = time48 - 86400000;
      //   this.temperatureData72 = this.temperatureData.filter(item => {
      //     item.createdAt > time72 && item.createdAt < time48;
      //   });
      this.temperatureData72 = this.temperatureData.filter(function(item) {
        return item.createdAt > time72 && item.createdAt < time48;
      });
      console.log("333", this.temperatureData72);
      let time96 = time72 - 86400000;
      //   this.temperatureData96 = this.temperatureData.filter(item => {
      //     item.createdAt > time96 && item.createdAt < time72;
      //   });
      this.temperatureData96 = this.temperatureData.filter(function(item) {
        return item.createdAt > time96 && item.createdAt < time72;
      });
      console.log("444", this.temperatureData96);
      let time120 = time96 - 86400000;
      //   this.temperatureData120 = this.temperatureData.filter(item => {
      //     item.createdAt > time120 && item.createdAt < time96;
      //   });
      this.temperatureData120 = this.temperatureData.filter(function(item) {
        return item.createdAt > time120 && item.createdAt < time96;
      });
      console.log("555", this.temperatureData120);
      let time144 = time120 - 86400000;
      //   this.temperatureData144 = this.temperatureData.filter(item => {
      //     item.createdAt > time144 && item.createdAt < time120;
      //   });
      this.temperatureData144 = this.temperatureData.filter(function(item) {
        return item.createdAt > time144 && item.createdAt < time120;
      });
      console.log("666", this.temperatureData144);
      let time168 = time144 - 86400000;
      //   this.temperatureData168 = this.temperatureData.filter(item => {
      //     item.createdAt > time168 && item.createdAt < time144;
      //   });
      this.temperatureData168 = this.temperatureData.filter(function(item) {
        return item.createdAt > time168 && item.createdAt < time144;
      });
      console.log("777", this.temperatureData168);
      console.log("this.temperatureData96", this.temperatureData96);

      // //选出体温超过37.5的人
      // this.overTemperatureData = this.tableData.filter(item=>item.temp >=37.5)
      // console.log('overTemperatureData',this.overTemperatureData )
    },
    async getPeopleList2() {

        
      const res = await this.axios.get("http://47.97.251.68:3000/temp");

      // this.temperatureData = res.data

      this.tableData = res.data;

      // console.log(this.temperatureData )
      //日期可读化
    //   this.tableData.map(
    //     item => (item.createdAt = item.createdAt.slice(11, 19))
    //   );

      // this.temperatureData = a.map(item=>item.createdAt = new Date(item.createdAt).getTime())
      // console.log('res.data',res.data )
      // console.log('33',this.temperatureData )
      //数组倒叙并取前三
      this.tableData.reverse();
        
      console.log('this.tableData',this.tableData)
      console.log('lastTimeLength: ' + this.lastTimeLength);
      console.log('this.tableData[0].temp: ' + this.tableData[0].temp);

      if (this.isFirst) {
        this.isFirst = false;
        this.lastTimeLength = this.tableData.length;
      this.tableData = this.tableData.slice(0, 3)

        return;
      }

      if(this.tableData.length !== this.lastTimeLength){


        this.lastTimeLength = this.tableData.length;

        if (this.tableData.length > 0 && this.tableData[0].temp >= 37.5) {
          this.showNotify();

        }
  
      }
       
      //选出体温超过37.5的人
      this.tableData = this.tableData.slice(0, 3)
      this.overTemperatureData = this.tableData.filter(item=>item.temp >=37.5)

      
      console.log("this.tableData", this.tableData);
    },

    showNotify() {

    //   this.$notify({
    //     title: "紧急通报",
    //     message: "您有新的紧急通报，请及时处理",
    //     type: "warning",
    //     duration: 0,
    //     onClose: () => {
    //       this.dialogVisible = false;
    //       this.closeDevice();
    //     }
    //   });

      var sound = new Howl({
        src: ['waring.mp3']
      });

      sound.play();
      console.log('paly sound');
    //   this.dialogVisible = true;
    },
    updateTable() {
      if (!this.time) {
        let that = this;
        this.time = setInterval(function() {
          console.log(that.tableData);
          that.getPeopleList();
          that.drawLine1();
            that.drawLine2();
            that.drawLine3();
            that.drawLine5();
            that.drawLine6();
        }, 3500);
      }
    },
    //计算当天的合格率，返回异常个数和正常个数
    caclOverTemp(array) {
      this.overTemperatureData = array.filter(item => item.temp >= 37.5);
      console.log("dd", this.overTemperatureData);
      // 基于准备好的dom，初始化echarts实例
      let overNumber = this.overTemperatureData.length;
      let notoverNumber = array.length - overNumber;
      return [overNumber, notoverNumber];
    },
    overTemperature() {
      //如果人员列表最新测试人员温度大于37.5
      if (this.tableData[this.tableData.length - 1].temperature >= 37.5) {
        console.log("测试温度大于37.5");
      }
    }
    // handleSizeChange(newsize){
    //    console.log(newsize)
    //    this.pagenum=newsize
    //    //调用方法
    //   },
    // handleCurrentChange(newpage){
    //     console.log(newpage)
    //     this.pagesize=newpage
    //     //调用方法
    // }
  }
};
</script>
<style  scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
  width: 100%;
  height: 100%;
  
}
.el-main {
  padding: 0;
}
.box-card {
  opacity: 0.9;
  height: 268px;
}
.title{
    text-align: center;
    margin: 10px 0;
    color: #909399;
    font-weight: 600;
}
</style>