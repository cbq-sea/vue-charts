<template>
  <v-chart
    ref="pie"
    :theme="theme"
    :class="chartClass"
    :loading="loading"
    :loadingOptions="loadingOptions"
    :initOptions="initOptions"
    :options="chartConfig"
    v-bind="$attrs"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    v-on="$listeners"
  />
</template>
<script>
import VChart from '../../core'
import { summate } from '@/utils'
import { pieEmphasisLabel } from '@/itemDefaultConfig'

export default {
  name: 'XmPie',

  components: {
    VChart,
  },

  props: {
    showTitle: {
      type: Boolean,
      default: false,
    },
    loadingOptions: Object, // loading 状态配置项
    loading: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false, // 是否开启动画
    },
    radius: {
      type: [String, Array],
      default: function() {
        return ['40%', '60%']
      }, // [内半径, 外半径]
    },
    center: {
      type: Array,
      default: function() {
        return ['28%', '50%']
      }, // [x, y]
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
    config: {
      type: Object,
      default: function() {
        return {}
      },
    },
    chartClass: String,
    y: Array,
    themeColor: Array,
    nameCut: {
      type: Boolean,
      default: true,
    },
    legendNameLength: {
      type: Number,
      default: 8,
    },
  },

  data() {
    return {
      index: 0, // 高亮索引
    }
  },

  computed: {
    chartConfig() {
      const { title, legend, color, tooltip, series, ...otherConfig } = this.options

      const option = {
        title: {
          show: this.showTitle, // title.show优先级高于showTitle
          ...title,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} {d}%',
          ...tooltip,
        },
        color: color || this.themeColor,
        legend: {
          top: 'center',
          type: 'scroll',
          orient: 'vertical',
          right: '2%',
          itemGap: 15,
          icon: 'pin',
          selectedMode: false,
          textStyle: {
            rich: {
              name: {
                color: this.theme.startsWith('xm-dark') ? '#fff' : '#262A30',
                // width: 60
              },
              value: {
                padding: [0, 5, 0, 5],
              },
              percent: {
                color: '#00A9FF',
              },
            },
          },

          formatter: name => {
            const indicatorData = series ? series[0].data : this.y
            const total = summate(indicatorData)
            const res = indicatorData.filter(v => v.name === name)
            const percent = ((res[0].value * 100) / total).toFixed(2)
            if (this.nameCut && !this.theme.startsWith('xm-dark')) {
              // xm-dark 为中屏，不要截取
              return (
                '{name|' +
                (name.length > this.legendNameLength
                  ? name.substring(0, this.legendNameLength) + '...'
                  : name) +
                '} {percent|' +
                percent +
                '%}'
              )
            }

            return '{name|' + name + '} {percent|' + percent + '%}'
          },
          ...legend,
        },

        series: series
          ? series.map(item => ({
              type: 'pie',
              label: { show: false, position: 'center' },
              radius: this.radius,
              center: this.center,
              emphasis: {
                label: {
                  ...pieEmphasisLabel(this.theme),
                },
              },
              ...item,
            }))
          : [
              {
                type: 'pie',
                label: { show: false, position: 'center' },
                radius: this.radius,
                center: this.center,
                emphasis: {
                  label: {
                    ...pieEmphasisLabel(this.theme),
                  },
                },
                data: this.y,
              },
            ],

        ...otherConfig,
      }
      this.$nextTick(() => {
        this.setAnimate(option)
      })
      return option
    },
  },

  // watch: {
  //   options() {
  //     this.$nextTick(() => {
  //       if (!this.loop) {
  //         this.handleSelect()
  //       }
  //     })
  //   },
  // },

  mounted() {
    if (!this.loop) {
      this.handleSelect()
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.pie.chart
    },

    handleMouseOver(e) {
      if (e.dataIndex !== this.index) {
        this.getEchartsInstance().dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index,
        })
      } else {
        this.getEchartsInstance().dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: 0,
        })
      }
    },

    handleMouseOut(e) {
      this.index = e.dataIndex
      this.getEchartsInstance().dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      })
    },

    handleSelect() {
      const pieChart = this.getEchartsInstance()
      pieChart &&
        pieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.index,
        })
    },

    setAnimate(option) {
      const { series = [] } = option
      if (!this.loop) return

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
        if (index >= series[0]?.data?.length || 0) {
          index = 0
        }
      }, 2000)
    },
  },
}
</script>
