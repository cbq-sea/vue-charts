import WordCloud from './src/main'

WordCloud.install = function(Vue) {
  Vue.component(WordCloud.name, WordCloud)
}

export default WordCloud
