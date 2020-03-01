<template>
    <div class="flex">
        <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
        <div id="myChart2" :style="{width: '300px', height: '300px'}"></div>
        <div id="myChart3" :style="{width: '300px', height: '300px'}"></div>
        <div id="myChart4" :style="{width: '300px', height: '300px'}"></div>
        <div id="myChart5" :style="{width: '300px', height: '300px'}"></div>
        <div id="myChart6" :style="{width: '300px', height: '300px'}"></div>

    </div>

</template>>
<script>
import echarts from 'echarts'
export default {
    name: 'hello',
    data () {
        return {
        msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted(){
        this.drawLine1();
        this.drawLine2();
        this.drawLine3();
        this.drawLine4();
        this.drawLine5();
        this.drawLine6();
    },
    methods: {
        drawLine1(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart1'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        drawLine2(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart2'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        drawLine3(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart3'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        drawLine4(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart4'));
            // 绘制图表
            myChart.setOption({
                 color: ['#3398DB'],
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        drawLine5(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart5'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        drawLine6(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('myChart6'));
            // 绘制图表
            myChart.setOption({
                title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
            });
        }
    }
    }
</script>
<style  lang="less" scoped>
    .flex{
        display: flex;
        flex-wrap:wrap;
        width:100%;
        height: 100%;
    }
</style>