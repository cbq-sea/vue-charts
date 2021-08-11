<template>
  <v-chart
    ref="pie"
    :theme="theme"
    :initOptions="initOptions"
    :loading="loading"
    :loadingOptions="loadingOptions"
    :options="chartConfig"
    :style="config.height ? { height: config.height + 'px' } : {}"
    v-on="$listeners"
  />
</template>

<script>
import VChart from '../../core'
import { titleTextStyle, pieSeriesConfig } from '@/itemDefaultConfig'

export default {
  name: 'pie-chart',

  components: {
    VChart,
  },

  props: {
    showTitle: {
      type: Boolean,
      default: false,
    },
    initOptions: Object,
    loadingOptions: Object, // loading 状态配置项
    loading: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: [String, Array],
      default: function() {
        return ['35%', '50%']
      }, // [内半径, 外半径]
    },
    center: {
      type: Array,
      default: function() {
        return ['50%', '50%']
      }, // [x, y]
    },
    options: {
      type: Object,
      default: function() {
        return {
          series: [
            // {
            //   data: [
            //     {
            //       name: '示意1',
            //       value: 200
            //     },
            //     {
            //       name: '示意2',
            //       value: 600
            //     }
            //   ]
            // }
          ],
        }
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

  data() {
    return {}
  },

  computed: {
    chartConfig() {
      const { title, legend, tooltip, series, ...otherConfig } = this.options

      const option = {
        title: {
          ...titleTextStyle,
          show: this.showTitle, // title.show优先级高于showTitle
          ...title,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          ...tooltip,
        },
        legend: {
          top: 'bottom',
          type: 'scroll',
          itemGap: 15,
          icon: 'pin',
          ...legend,
        },

        series: (series || []).map(item => ({
          ...pieSeriesConfig,
          radius: this.radius,
          center: this.center,
          ...item,
        })),
        ...otherConfig,
      }

      return option
    },
  },

  methods: {
    getEchartsInstance() {
      return this.$refs.pie.chart
    },
  },
}
</script>
