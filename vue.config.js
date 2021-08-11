module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  outputDir: 'dist',
  productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
  css: {
    extract: false,
  },
  configureWebpack: {
    // externals: {
    //   vue: {
    //     root: 'Vue',
    //     commonjs: 'vue',
    //     commonjs2: 'vue',
    //     amd: 'vue',
    //   },
    // },
    optimization: {
      minimize: process.env.NODE_ENV === 'production',
    },
  },
}
