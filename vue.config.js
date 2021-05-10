module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: '9527',
    open: true,
    hot:true,
    proxy: { //配置跨域
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,//允许跨域
        pathRewrie: {
          '^/api': ''   //请求的时候使用这个api就可以
        }
      }
    }
  }
}