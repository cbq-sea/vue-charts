import Bar from './src/main'

Bar.install = function(Vue) {
  Vue.component(Bar.name, Bar)
}

export default Bar
