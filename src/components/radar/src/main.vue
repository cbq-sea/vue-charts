<template>
  <v-chart
    ref="radar"
    :theme="theme"
    :loading="loading"
    :loadingOptions="loadingOptions"
    :initOptions="initOptions"
    :options="chartConfig"
    :style="config.height ? { height: config.height + 'px' } : {}"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import VChart from '../../core'

export default {
  name: 'XmRadar',

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
  },

  computed: {
    chartConfig() {
      const { title, legend, tooltip, series, ...otherConfig } = this.options

      const option = {
        title,
        tooltip: {
          ...tooltip,
        },
        legend: {
          type: 'scroll',
          ...legend,
        },

        series: (series || []).map(item => ({
          type: 'radar',
          ...item,
        })),
        ...otherConfig,
      }

      return option
    },
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.radar.chart
    },
  },
}
</script>
