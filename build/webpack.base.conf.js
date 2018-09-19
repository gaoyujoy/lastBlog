var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob');
var entries =  utils.getMultiEntry('./src/module/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);

var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// Object.assign(entries, {
//   // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包
//   'view': ['simplemde', 'highlight.js']
// })
var webpackConfig = {
  entry: entries,
  output: {
    path: config.assetsRoot,
    publicPath: '/',
    filename: utils.assetsPath('[name].js'),
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/iview')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
      
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: chunks,
	  	minChunks: 4 || chunks.length 
    })
	/*
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: 4 || chunks.length //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。

    }),*/
   
  ]
}

var pages =  utils.getMultiEntry('./src/module/**/*.html');
for (var pathname in pages) {

  var conf = {
    //filename: pathname + '.html',
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: ['vendor', pathname], // 每个html引用的js模块
    inject: true,              // js插入位置
    favicon: path.resolve('micaiah.ico'),
	  hash:true
  };
 
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = webpackConfig;
// module.exports = vuxLoader.merge(webpackConfig, {
//     options: {
    
//   },	
//   plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
// })
