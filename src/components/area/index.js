import Area from './src/main'

Area.install = function(Vue) {
  Vue.component(Area.name, Area)
}

export default Area
