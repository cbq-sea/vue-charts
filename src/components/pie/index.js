import Pie from './src/main'

Pie.install = function(Vue) {
  Vue.component(Pie.name, Pie)
}

export default Pie
