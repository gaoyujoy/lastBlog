require('./build/check-version')()
const Koa = require('koa');
var views = require('koa-views');
const convert = require('koa-convert');
const fs = require('fs');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser')();
const mongoose = require('mongoose');
import session from "koa2-cookie-session";
var path = require('path');
process.env.NODE_ENV = 'production'

var ora = require('ora');
var rm = require('rimraf');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('./build/config');
var webpackConfig = require('./build/webpack.dev.conf');
import mongooseModules from './modules/modules.js'
var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
  if (err) throw err
  var compiler = webpack(webpackConfig)
  compiler.watch({ // watch options:
      aggregateTimeout: 300, // wait so long for more changes
      poll: true // use polling instead of native watchers
      // pass a number to set the polling interval
  }, function(err, stats) {
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
  });
})

const app = new Koa();


app.use(session({
	key: "gaoyublog:session",   //default "koa:sid"
	expires: 30/(24*60), //default 7 day 除以24*60 得到分钟
	path:"/" //default "/"
}));

app.use(convert(bodyparser));
app.use(convert(require('koa-static')(`${__dirname}/public`)));
app.use(convert(views(`${__dirname}/templates`)));

//配置数据库
const mongoOptions = {
	user: 'gaoyu',
	pass: 'gjy321456'
};
mongoose.connect(`mongodb://123.207.124.58/gaoyublog`, mongoOptions); // 数据库链接
const db = mongoose.connection;
const DBModule = new mongooseModules(mongoose);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("db opened")
});

//导入路由
const addRouters = (path) => {
    var files = fs.readdirSync(path);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    }, files);
    js_files.forEach(name => {
        (new (require(`${__dirname}/routers/${name}`).default)(router, DBModule, app)).init();
    });
}
addRouters(__dirname + '/routers');
app.use(router.routes(), router.allowedMethods());

let server = app.listen(process.env.PORT||3001);