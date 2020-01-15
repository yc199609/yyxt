<template>
<!-- :style="'width:'+chartWidth+';height:'+chartHeight+';'" -->
  <div
    ref="myChart"
    style="width: 900px; height: 900px"
  ></div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: ['chartWidth', 'chartHeight'],
  mounted() {
    const myChart = this.$echarts.init(this.$refs.myChart)
    var dataAll = [
    ]
    var markLineOpt = {
    }
    var option = {
    title: {
      text: '特征曲线',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['泵扬程流量曲线(泵特征曲线)', '装置系统阻力曲线(装置特征曲线)', '轴功率曲线', '汽蚀余量曲线'],
      top: 50
    },
    toolbox: {
      right: 80,
      top: 10,
      feature: {
        saveAsImage: {}
      }
    },
    grid: [
        {x: '10%', y: '15%', width: '80%', height: '30%'},
        {x: '10%', y: '15%', width: '80%', height: '64%'},
        {x: '10%', y: '49%',width: '80%', height: '30%'},
        {x: '10%', y: '50%', width: '80%', height: '20%'}
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: ' {a}: ({c})'
    },
    xAxis: [
        {type: 'category', splitLine:{show: false}, gridIndex: 0, data:[0,200,400,600,800,1000,1200,1400,1600,1800,2000], show:false},
        {type: 'category', splitLine:{show: false}, gridIndex: 1, data:[0,200,400,600,800,1000,1200,1400,1600,1800,2000]},
        {type: 'category', splitLine:{show: false}, gridIndex: 2, data:[0,200,400,600,800,1000,1200,1400,1600,1800,2000],show:false}, // 显示x轴
        {type: 'category', splitLine:{show: false}, gridIndex: 3, data:[1400,1500,1600],show:false}
    ],
    yAxis: [
        { splitLine:{show: false}, name: 'H(m)', gridIndex: 0, type: 'value',max:50,min:10}, // splitLine:{show: true,lineStyle:{color: ['green']}},
        { splitLine:{show: false}, name: 'Eff(%)', gridIndex: 1, type: 'value', splitNumber:11, position:'right',max:100,min:0},
        { splitLine:{show: false}, name: 'Pa(kW)', gridIndex: 2, type: 'value', max:650,min:400},
        { splitLine:{show: false}, name: 'NPSH', gridIndex: 3, type: 'value', position:'right', offset: 65,max:2, min:7},
    ],
    series: [
        {
          name: '泵扬程流量曲线(泵特征曲线)',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: [44, 41, 38, 36, 35, 34, 33,26,15],
        },
        {
          name: '装置系统阻力曲线(装置特征曲线)',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [2, 8, 14, 20, 32, 45, 85,87,76],
        },
        {
          name: '轴功率曲线',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: [440, 450, 460, 500, 550, 570, 590,570,560],
        },
        {
            name: '汽蚀余量曲线',
            type: 'line',
            xAxisIndex: 3,
            yAxisIndex: 3,
            data: [3, 5, 6, 7],
        }
    ]
};
    myChart.setOption(option);
  }
}
</script>
