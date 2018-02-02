// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../manager/index.html'),
    assetsRoot: path.resolve(__dirname, '../manager'),
    assetsSubDirectory: 'static',
    assetsPublicPath: 'http://www.dszongbu.com/Pc/manager/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
},
dev: {
    env: require('./dev.env'),
    port: 8880,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    context: [
    '/account',
    '/realestate',
    '/matter',
    '/useraccount',
    '/info',
    '/weixin',
    '/manager',
    '/standbook'
    ],
    // proxypath:'http://182.92.156.114',
    proxypath:'http://139.224.116.81:8502',
     // proxypath:'http://www.dszongbu.com:8500',
    // proxypath:'http://163500b8f8.imwork.net',
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
}
}
