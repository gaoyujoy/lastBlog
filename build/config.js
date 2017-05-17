// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    env: {
        NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../views/index/index.html'),
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'dist/static',
    fileName: "/dist/static",
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
}
