import VChart from './src/main'

VChart.install = function(Vue) {
  Vue.component(VChart.name, VChart)
}

export default VChart
