const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:1234',
        // 需要进行Android打包
        // target: 'http://10.0.2.2:1234'
        ws: false, // proxy websockets
        changOrigin: true, // 是否允许跨域
        pathRewrite: { // 重定向
          "^/api": ""
        }
      }
    }
  },
})
