<template>
  <v-chart
    ref="cloud"
    :theme="theme"
    :loading="loading"
    :loadingOptions="loadingOptions"
    :initOptions="initOptions"
    :options="chartConfig"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import VChart from '../../core'

export default {
  name: 'XmWordCloud',

  components: {
    VChart,
  },

  props: {
    setColor: Function,
    showTitle: {
      type: Boolean,
      default: false,
    },
    loadingOptions: Object, // loading 状态配置项
    loading: {
      type: Boolean,
      default: false,
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
  },

  computed: {
    chartConfig() {
      const { title, legend, tooltip, series, ...otherConfig } = this.options

      const option = {
        title,
        tooltip: {
          trigger: 'item',
          padding: [10, 15],
          textStyle: {
            fontSize: 20,
          },
          ...tooltip,
        },
        legend: {
          ...legend,
        },

        series: (series || []).map(item => ({
          type: 'wordCloud',
          gridSize: 20,
          sizeRange: [12, 50],
          rotationRange: [0, 0],
          shape: 'circle',
          textStyle: {
            normal: {
              color:
                typeof this.setColor === 'function'
                  ? this.setColor
                  : function() {
                      return (
                        'rgb(' +
                        Math.round(Math.random() * 255) +
                        ', ' +
                        Math.round(Math.random() * 255) +
                        ', ' +
                        Math.round(Math.random() * 255) +
                        ')'
                      )
                    },
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },

          ...item,
        })),
        ...otherConfig,
      }

      return option
    },
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.cloud.chart
    },
  },
}
</script>
