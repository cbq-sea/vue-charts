// import { registerTheme } from 'echarts/lib/echarts'

import { registerTheme, registerMap } from 'echarts'
import '../dependency'
import '../theme'

import VChart from './core'
import Bar from './bar'
import Line from './line'
import Pie from './pie'
import Area from './area'
import Radar from './radar'
import WordCloud from './word-cloud'
import Progress from './progress'
import Sankey from './sankey'

const components = [VChart, Bar, Line, Pie, Area, Radar, WordCloud, Progress, Sankey]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  registerTheme,
  registerMap,
  VChart,
  Bar,
  Line,
  Area,
  Pie,
  Radar,
  WordCloud,
  Progress,
  Sankey,
}

export default {
  install,
}
