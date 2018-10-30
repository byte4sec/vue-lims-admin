// vue.config.js
module.exports = {

  // 部署应用的基础URL: String '/'
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',

  // 运行时将生成构建文件的目录: String
  // outputDir: 'dist',

  // 相对于 outputDir 生成的静态目录
  // assetsDir: '',

  // 指定生成的输出路径, 相对于outputDir: String
  // indexPath: 'index.html'

  // 是否使用ESList: Boolean true
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否需要生产源映射: Boolean true
  productionSourceMap: false,

  // 开发服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8081,         // 端口号
    https: false,       // https: Boolean
    open: true,         // 自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://192.168.6.181:9003',
        changeOrigin: false,
        autoRewrite: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
      '/login': {
        target: 'http://192.168.6.181:9003',
        changeOrigin: false,
        autoRewrite: true,
        pathRewrite: {
          '^/login': '',
        },
      },
    },
    disableHostCheck: true,
  },
};
