const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    proxy: {
      '/api': {
        target: 'http://101.35.48.153:1234',
        ws: false, // proxy websockets
        changOrigin: true, // 是否允许跨域
        pathRewrite: { // 重定向
          "^/api": ""
        }
      }
    }
  },
})
