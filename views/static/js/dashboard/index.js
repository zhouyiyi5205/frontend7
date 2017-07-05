define(['echarts'], function(echarts) {
   // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '课程种类 '
        },
        tooltip: {},
        legend: {
            data:['课程数量']
        },
        xAxis: {
            data: ["HTML","CSS","Mobile","Angular","Vue","Nodejs"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    
});