<template>
  <v-chart
    ref="sankey"
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

export default {
  name: 'XmSankey',

  components: {
    VChart,
  },

  props: {
    loadingOptions: Object, // loading 状态配置项
    loading: {
      type: Boolean,
      default: false,
    },
    dataZoom: {
      type: Boolean,
      default: false, // 是否开启横向滚动
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
    y: {
      type: Array,
      default: () => [],
    },
    links: {
      type: Array,
      default: () => [],
    },
    themeColor: Array,
  },

  data() {
    return {}
  },

  computed: {
    chartConfig() {
      const { title, legend, color, grid, series = [], ...otherConfig } = this.options

      const option = {
        title: {
          show: this.showTitle,
          ...title,
        },
        color: color || this.themeColor,
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        legend: {
          type: 'scroll',
          ...legend,
        },

        grid: {
          right: '6%',
          ...grid,
        },

        series: series
          ? series
          : [
              {
                data: this.y,
                links: this.links,
              },
            ],

        ...otherConfig,
      }

      option.series = option.series.map(it => ({
        type: 'sankey',
        // emphasis: {
        //   focus: 'adjacency',
        // },
        orient: 'horizontal',
        // label: {
        //   position: 'top',
        //   show: true,
        //   color: '#fff',
        // },
        lineStyle: {
          color: 'source',
          curveness: 0.5,
        },
        ...it,
      }))

      return option
    },
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.sankey.chart
    },
  },
}
</script>
