<template>
  <div
    ref="myChart"
    :style="'width:'+chartWidth+';height:'+chartHeight+';'"
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
    var option = {
      title: {
        top: 'bottom',
        left: 'center'
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '完成率' }]
        }
      ]
    }
    myChart.setOption(option);
  }
}
</script>
