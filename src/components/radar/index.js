import Radar from './src/main'

Radar.install = function(Vue) {
  Vue.component(Radar.name, Radar)
}

export default Radar
