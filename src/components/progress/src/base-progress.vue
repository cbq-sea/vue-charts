<template>
  <div class="xm-progress" :style="{ width: this.type === 'line' ? '100%' : width + 'px' }">
    <div
      class="xm-chart-progress"
      :class="[
        'xm-chart-progress--' + type,
        status ? 'is-' + status : '',
        {
          'xm-chart-progress--without-text': !showText,
          'xm-chart-progress--text-inside': textInside,
        },
      ]"
      role="progressbar"
      :style="type === 'circle' ? { width: '100%' } : {}"
    >
      <div class="xm-chart-progress-bar" v-if="type === 'line'">
        <div
          class="xm-chart-progress-bar__outer"
          :style="{ height: strokeWidth + 'px', backgroundColor: bgColor }"
        >
          <div class="xm-chart-progress-bar__inner" :style="barStyle">
            <div class="xm-chart-progress-bar__innerText" v-if="showText && textInside">
              {{ content }}
            </div>
          </div>
        </div>
      </div>
      <div class="xm-chart-progress-circle" :style="{ width: '100%' }" v-else>
        <svg viewBox="0 0 100 100">
          <path
            class="xm-chart-progress-circle__track"
            :d="trackPath"
            stroke="#f7f8f9"
            :stroke-width="relativeStrokeWidth"
            fill="none"
            :style="trailPathStyle"
          ></path>
          <path
            class="xm-chart-progress-circle__path"
            :d="trackPath"
            :stroke="stroke"
            fill="none"
            :stroke-linecap="strokeLinecap"
            :stroke-width="percentage ? relativeStrokeWidth : 0"
            :style="circlePathStyle"
          ></path>
        </svg>
        <div class="xm-chart-progress__text" v-if="showText && type === 'circle'">
          <span>{{ content }}</span>
        </div>
      </div>
      <div class="xm-chart-progress__text" v-if="showText && type !== 'circle'">
        <span>{{ content }}</span>
      </div>
    </div>
    <p
      :class="['xm-chart-progress__title', theme === 'xm' ? '' : 'xm-chart-progress__title--dark']"
      v-if="showTitle"
    >
      {{ title }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'XmProgress',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'circle', 'dashboard'].indexOf(val) > -1,
    },
    direct: {
      type: String,
      default: 'right',
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100,
    },
    status: {
      type: String,
      validator: val => ['success', 'exception', 'warning'].indexOf(val) > -1,
    },
    strokeWidth: {
      type: Number,
      default: 14,
    },
    strokeLinecap: {
      type: String,
      default: 'round',
    },
    title: {
      type: String,
    },
    textInside: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 100,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    color: {
      type: [String, Array, Function],
      default: '',
    },
    stroke: {
      type: String,
      default: '#20a0ff',
    },
    format: Function,
    theme: {
      type: String,
      default: 'xm',
    },
    bgColor: {
      type: String,
      default: '#ebeef5',
    },
  },

  computed: {
    barStyle() {
      const style = {}
      style.width = this.percentage + '%'
      style.background = this.getCurrentColor(this.percentage)
      return style
    },
    relativeStrokeWidth() {
      return +((this.strokeWidth / this.width) * 100).toFixed(1)
    },
    radius() {
      if (this.type === 'circle' || this.type === 'dashboard') {
        return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
      } else {
        return 0
      }
    },

    trackPath() {
      const radius = this.radius
      const isDashboard = this.type === 'dashboard'
      return this.direct === 'left'
        ? `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 0 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 0 0 ${isDashboard ? '' : '-'}${radius * 2}
          `
        : `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${radius}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
          a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
          `
    },
    perimeter() {
      return 2 * Math.PI * this.radius
    },
    rate() {
      return this.type === 'dashboard' ? 0.75 : 1
    },
    strokeDashoffset() {
      const offset = (-1 * this.perimeter * (1 - this.rate)) / 2
      return `${offset}px`
    },
    trailPathStyle() {
      return {
        strokeDasharray: `${this.perimeter * this.rate}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
        // transition: 'stroke-dasharray 6s ease 0s, stroke 6s ease',
      }
    },
    circlePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${
          this.perimeter
        }px`,
        strokeDashoffset: this.strokeDashoffset,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
      }
    },
    // stroke() {
    //   let ret
    //   if (this.color) {
    //     ret = this.getCurrentColor(this.percentage)
    //   } else {
    //     switch (this.status) {
    //       case 'success':
    //         ret = '#13ce66'
    //         break
    //       case 'exception':
    //         ret = '#ff4949'
    //         break
    //       case 'warning':
    //         ret = '#e6a23c'
    //         break
    //       default:
    //         ret = '#20a0ff'
    //     }
    //   }
    //   return ret
    // },

    progressTextSize() {
      return this.type === 'line' ? 12 + this.strokeWidth * 0.4 : this.width * 0.111111 + 2
    },
    content() {
      if (typeof this.format === 'function') {
        return this.format(this.percentage) || ''
      } else {
        return `${this.percentage > 100 ? 100 : this.percentage}%`
      }
    },
  },

  methods: {
    getCurrentColor(percentage) {
      if (typeof this.color === 'function') {
        return this.color(percentage)
      } else if (typeof this.color === 'string') {
        return this.color
      } else {
        return this.getLevelColor(percentage)
      }
    },
    getLevelColor(percentage) {
      const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage)
      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color
        }
      }
      return colorArray[colorArray.length - 1].color
    },
    getColorArray() {
      const color = this.color
      const span = 100 / color.length
      return color.map((seriesColor, index) => {
        if (typeof seriesColor === 'string') {
          return {
            color: seriesColor,
            percentage: (index + 1) * span,
          }
        }
        return seriesColor
      })
    },
  },
}
</script>

<style>
.xm-chart-progress {
  position: relative;
  line-height: 1;
  text-align: center;
}

.xm-chart-progress svg {
  width: 100%;
  position: relative;
}

.xm-chart-progress__text {
  font-size: 14px;
  color: #606266;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  line-height: 1;
}

.xm-chart-progress__text i {
  display: block;
}

.xm-chart-progress--circle,
.xm-chart-progress--dashboard {
  display: inline-block;
}
.xm-chart-progress-circle {
  position: relative;
}

.xm-chart-progress--circle .xm-chart-progress__text,
.xm-chart-progress--dashboard .xm-chart-progress__text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

.xm-chart-progress--circle .xm-chart-progress__text i,
.xm-chart-progress--dashboard .xm-chart-progress__text i {
  vertical-align: middle;
  display: inline-block;
}

.xm-chart-progress--without-text .xm-chart-progress__text {
  display: none;
}

.xm-chart-progress--without-text .xm-chart-progress-bar {
  padding-right: 0;
  margin-right: 0;
  display: block;
}

.xm-chart-progress-bar,
.xm-chart-progress-bar__inner::after,
.xm-chart-progress-bar__innerText {
  display: inline-block;
  vertical-align: middle;
}

.xm-chart-progress--text-inside .xm-chart-progress-bar {
  padding-right: 0;
  margin-right: 0;
}

.xm-chart-progress.is-success .xm-chart-progress-bar__inner {
  background-color: #67c23a;
}

.xm-chart-progress.is-success .xm-chart-progress__text {
  color: #67c23a;
}

.xm-chart-progress.is-warning .xm-chart-progress-bar__inner {
  background-color: #e6a23c;
}

.xm-chart-progress.is-warning .xm-chart-progress__text {
  color: #e6a23c;
}

.xm-chart-progress.is-exception .xm-chart-progress-bar__inner {
  background-color: #f56c6c;
}

.xm-chart-progress.is-exception .xm-chart-progress__text {
  color: #f56c6c;
}

.xm-chart-progress .xm-chart-progress__text {
  color: #606266;
  font-size: 16px;
}

.xm-chart-progress-bar {
  padding-right: 50px;
  width: 100%;
  margin-right: -55px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.xm-chart-progress-bar__outer {
  height: 6px;
  border-radius: 100px;
  background-color: #ebeef5;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.xm-chart-progress-bar__inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #409eff;
  text-align: right;
  border-radius: 100px;
  line-height: 1;
  white-space: nowrap;
  -webkit-transition: width 0.6s ease;
  transition: width 0.6s ease;
}

.xm-chart-progress-bar__inner::after {
  content: '';
  height: 100%;
}

.xm-chart-progress-bar__innerText {
  color: #fff;
  font-size: 14px;
  margin: 0 5px;
}

.xm-chart-progress__title {
  color: #262a30;
  margin: 6px 0 0 0;
  font-size: 14px;
  text-align: center;
}
.xm-chart-progress__title--dark {
  color: #fff;
}
@keyframes progress {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 32px 0;
  }
}
</style>
