<template>
  <v-chart
    ref="area"
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

export default {
  name: 'XmArea',

  components: {
    VChart,
  },

  props: {
    boundaryGap: {
      type: Boolean,
      default: true, // 是否两边留白
    },
    showTitle: {
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
    interval: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    initOptions: Object,
    rotate: {
      type: Number,
      default: 0, // x轴字体旋转
    },
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

  data() {
    return {}
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
        color: color || this.themeColor,
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          type: 'scroll',
          ...legend,
        },
        dataZoom: this.dataZoom ? dataZoom : [],

        grid: {
          right: '6%',
          ...grid,
        },

        xAxis: isArray(xAxis)
          ? xAxis.map(({ axisLabel, ...rest }) => ({
              axisLabel: {
                interval: this.interval ? 'auto' : 0,
                rotate: this.rotate || 0,
                ...axisLabel,
              },
              boundaryGap: this.boundaryGap,
              data: this.x,
              ...rest,
            }))
          : {
              boundaryGap: this.boundaryGap,
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
            formatter: function({ value }) {
              // 千分位分隔符
              return formatNumber(value)
            },
            ...item.label,
          }
        }

        item.type = item.type || 'line'
        item.areaStyle = item.areaStyle || { opacity: 0.2 }
      })

      return option
    },
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.area.chart
    },
  },
}
</script>
