<template>
  <div class="xm-echarts-wrap">
    <div v-show="!isEmpty" ref="chart" class="xm-echarts" />
    <chart-empty v-if="isEmpty" :empty-text="emptyText" :empty-image="emptyImage" />
  </div>
</template>

<style>
.xm-echarts-wrap {
  width: 100%;
  height: 300px;
}

.xm-echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector/dist'
import ChartEmpty from '../../empty'
import { debounce } from '../../../utils'

const INIT_TRIGGERS = ['theme', 'initOptions', 'autoresize']
const REWATCH_TRIGGERS = ['manualUpdate', 'watchShallow']

export default {
  name: 'XmChart',
  components: {
    ChartEmpty,
  },
  props: {
    options: Object,
    theme: {
      type: [String, Object],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
    emptyText: String,
    emptyImage: String,
    loadingOptions: {
      type: Object,
      default() {
        return {
          text: '加载中...',
          color: '#4413c2',
          textColor: '#270240',
          zlevel: 0,
        }
      },
    },
    initOptions: Object,
    group: String,
    autoresize: {
      type: Boolean,
      default: true,
    },
    watchShallow: Boolean,
    manualUpdate: Boolean,
  },
  data() {
    return {
      lastArea: 0,
    }
  },
  watch: {
    group(group) {
      this.chart.group = group
    },
    loading: {
      handler: function(loading) {
        if (!this.chart && loading) {
          return this.$nextTick(function() {
            // 解决初始loading为true 不执行的情况
            this.spin(loading)
          })
        }

        this.spin(loading)
      },
      immediate: true,
    },
  },
  methods: {
    getEchartsInstance() {
      return this.chart
    },

    mergeOptions(options, notMerge, lazyUpdate) {
      if (this.manualUpdate) {
        this.manualOptions = options
      }
      if (!this.chart) {
        this.init(options)
      } else {
        this.delegateMethod('setOption', options, notMerge, lazyUpdate)
      }
    },

    appendData(params) {
      this.delegateMethod('appendData', params)
    },
    resize(options) {
      this.delegateMethod('resize', options)
    },
    dispatchAction(payload) {
      this.delegateMethod('dispatchAction', payload)
    },
    convertToPixel(finder, value) {
      return this.delegateMethod('convertToPixel', finder, value)
    },
    convertFromPixel(finder, value) {
      return this.delegateMethod('convertFromPixel', finder, value)
    },
    containPixel(finder, value) {
      return this.delegateMethod('containPixel', finder, value)
    },
    spin(loading) {
      if (!this.chart) return

      if (loading) this.showLoading()
      else this.hideLoading()
    },
    showLoading(options) {
      this.delegateMethod('showLoading', options || this.loadingOptions)
    },
    hideLoading() {
      this.delegateMethod('hideLoading')
    },
    getDataURL(options) {
      return this.delegateMethod('getDataURL', options)
    },
    getConnectedDataURL(options) {
      return this.delegateMethod('getConnectedDataURL', options)
    },
    clear() {
      this.delegateMethod('clear')
    },
    dispose() {
      this.delegateMethod('dispose')
    },
    delegateMethod(name, ...args) {
      if (!this.chart) {
        this.init()
      }
      return this.chart[name](...args)
    },
    delegateGet(methodName) {
      if (!this.chart) {
        this.init()
      }
      return this.chart[methodName]()
    },
    getArea() {
      return this.$refs.chart.offsetWidth * this.$refs.chart.offsetHeight
    },
    init(options) {
      if (this.chart) {
        return
      }
      const chart = echarts.init(this.$refs.chart, this.theme, this.initOptions)
      if (this.group) {
        chart.group = this.group
      }
      chart.setOption(options || this.manualOptions || this.options || {}, true)
      Object.keys(this.$listeners).forEach(event => {
        const handler = this.$listeners[event]
        if (event.indexOf('zr:') === 0) {
          chart.getZr().on(event.slice(3), handler)
        } else {
          chart.on(event, handler)
        }
      })
      if (this.autoresize) {
        this.lastArea = this.getArea()
        this.__resizeHandler = debounce(() => {
          if (this.lastArea === 0) {
            this.mergeOptions({}, true)
            this.resize()
            this.mergeOptions(this.options || this.manualOptions || {}, true)
          } else {
            this.resize()
          }
          this.lastArea = this.getArea()
        }, 100)
        addListener(this.$refs.chart, this.__resizeHandler)
      }
      Object.defineProperties(this, {
        width: {
          configurable: true,
          get: () => {
            return this.delegateGet('getWidth')
          },
        },
        height: {
          configurable: true,
          get: () => {
            return this.delegateGet('getHeight')
          },
        },
        isDisposed: {
          configurable: true,
          get: () => {
            return !!this.delegateGet('isDisposed')
          },
        },
        computedOptions: {
          configurable: true,
          get: () => {
            return this.delegateGet('getOption')
          },
        },
      })
      this.chart = chart
    },
    initOptionsWatcher() {
      if (this.__unwatchOptions) {
        this.__unwatchOptions()
        this.__unwatchOptions = null
      }
      if (!this.manualUpdate) {
        this.__unwatchOptions = this.$watch(
          'options',
          (val, oldVal) => {
            if (!this.chart && val) {
              this.init()
            } else {
              this.chart.setOption(val, val !== oldVal)
            }
          },
          { deep: !this.watchShallow }
        )
      }
    },
    destroy() {
      if (this.autoresize) {
        removeListener(this.$refs.chart, this.__resizeHandler)
      }
      this.dispose()
      this.chart = null
    },
    refresh() {
      if (this.chart) {
        this.destroy()
        this.init()
      }
    },
  },
  created() {
    this.initOptionsWatcher()
    INIT_TRIGGERS.forEach(prop => {
      this.$watch(
        prop,
        () => {
          this.refresh()
        },
        { deep: true }
      )
    })
    REWATCH_TRIGGERS.forEach(prop => {
      this.$watch(prop, () => {
        this.initOptionsWatcher()
        this.refresh()
      })
    })
  },
  mounted() {
    // auto init if `options` is already provided
    if (this.options) {
      this.init()
    }
  },
  activated() {
    if (this.autoresize) {
      this.chart && this.chart.resize()
    }
  },
  destroyed() {
    if (this.chart) {
      this.destroy()
    }
  },
  connect(group) {
    if (typeof group !== 'string') {
      group = group.map(chart => chart.chart)
    }
    echarts.connect(group)
  },
  disconnect(group) {
    echarts.disConnect(group)
  },
  getMap(mapName) {
    return echarts.getMap(mapName)
  },
  registerMap(mapName, geoJSON, specialAreas) {
    echarts.registerMap(mapName, geoJSON, specialAreas)
  },
  registerTheme(name, theme) {
    echarts.registerTheme(name, theme)
  },
  graphic: echarts.graphic,
}
</script>
