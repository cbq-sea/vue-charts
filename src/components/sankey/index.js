import Sankey from './src/main'

Sankey.install = function(Vue) {
  Vue.component(Sankey.name, Sankey)
}

export default Sankey
