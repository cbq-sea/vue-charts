<template>
  <v-chart
    ref="line"
    :theme="theme"
    :initOptions="initOptions"
    :loading="loading"
    :loadingOptions="loadingOptions"
    :options="chartConfig"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import VChart from '../../core'
import { dataZoom } from '@/itemDefaultConfig'
import { formatNumber } from '@/utils'

const customTooltip = (data, isRate, i, unit) => {
  return `${i === 0 ? data.name : ''}</br> ${data.marker} ${data.seriesName}：${data.data}${
    isRate ? '%' : unit || ''
  }`
}

export default {
  name: 'XmLine',

  components: {
    VChart,
  },

  props: {
    isRate: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: '',
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    loadingOptions: Object, // loading 状态配置项
    loading: {
      type: Boolean,
      default: false,
    },
    dataZoom: {
      type: Boolean,
      default: false, // 是否开启横向滚动
    },
    loop: {
      type: Boolean,
      default: false, // 是否开启动画
    },
    rotate: {
      type: Number,
      default: 0,
    },
    initOptions: Object,
    options: {
      type: Object,
      default: function() {
        return {}
      },
    },
    theme: {
      type: [String, Object],
      default: 'xm',
    },
    x: {
      type: Array,
      default: () => [],
    },
    y: {
      type: Array,
      default: () => [],
    },
    yAxisName: [Array, String],
    themeColor: Array,
  },

  computed: {
    chartConfig() {
      const { title, legend, color, grid, xAxis, yAxis, series, ...otherConfig } = this.options

      const { isArray } = Array

      const option = {
        title: {
          show: this.showTitle, // title.show优先级高于showTitle
          ...title,
        },
        tooltip: {
          trigger: 'axis',
          formatter: data => {
            return data.map((data, i) => customTooltip(data, this.isRate, i, this.unit)).join('')
          },
        },
        color: color || this.themeColor,
        legend: {
          type: 'scroll',
          ...legend,
        },
        dataZoom: this.dataZoom ? dataZoom : [],
        grid: {
          ...grid,
        },

        xAxis: isArray(xAxis)
          ? xAxis.map(({ axisLabel, ...rest }) => ({
              axisLabel: {
                interval: this.interval ? 'auto' : 0,
                rotate: this.rotate || 0,
                ...axisLabel,
              },
              data: this.x,
              ...rest,
            }))
          : {
              data: this.x,
              ...xAxis,
              axisLabel: {
                interval: this.interval ? 'auto' : 0,
                rotate: this.rotate || 0,
                ...xAxis?.axisLabel,
              },
            },

        yAxis: isArray(yAxis)
          ? yAxis.map((item, index) => ({
              name: isArray(this.yAxisName) ? this.yAxisName[index] : this.yAxisName,
              ...item,
            }))
          : {
              name: isArray(this.yAxisName) ? this.yAxisName[0] : this.yAxisName,
              ...yAxis,
            },

        series: series ? series : this.y,

        ...otherConfig,
      }

      option.series.forEach(item => {
        if (this.showLabel || (item.label && item.label.show)) {
          item.label = {
            formatter: this.isRate
              ? '{c}%'
              : function({ value }) {
                  // 千分位分隔符

                  return formatNumber(value)
                },
            ...item.label,
          }
        }
        item.type = item.type || 'line'
        item.barMaxWidth = item.barMaxWidth || 22
        item.barMinWidth = item.barMinWidth || 2
      })
      this.$nextTick(() => {
        this.setAnimate(option)
      })
      return option
    },
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.line.chart
    },

    setAnimate(option) {
      const { xAxis = {} } = option
      if (Array.isArray(xAxis) || this.isHorizontal || !this.loop) return

      const chartInstance = this.getEchartsInstance()
      clearInterval(this.timer)

      let index = 0 // 高亮索引
      this.timer = setInterval(() => {
        chartInstance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index,
        })
        chartInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index - 1 < 0 ? 1 : index - 1,
        })

        chartInstance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,
        })

        index++
        if (index >= xAxis?.data?.length || 0) {
          index = 0
        }
      }, 2000)
    },
  },
}
</script>
