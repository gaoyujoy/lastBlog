require('./build/check-version')()
var path = require('path');
process.env.NODE_ENV = 'production'

var ora = require('ora');
var rm = require('rimraf');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('./build/config');
var webpackConfig = require('./build/webpack.prod.conf');
var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})