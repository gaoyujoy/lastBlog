require('./build/check-version')()
const Koa = require('koa');
var views = require('koa-views');
const convert = require('koa-convert');
const fs = require('fs');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser')();
const mongoose = require('mongoose');
import session from "koa2-cookie-session";
process.env.NODE_ENV = 'production'
import mongooseModules from './modules/modules.js'


const app = new Koa();


app.use(session({
	key: "gaoyublog:session",   //default "koa:sid"
	expires: 30/(24*60), //default 7 day 除以24*60 得到分钟
	path:"/" //default "/"
}));

app.use(convert(bodyparser));
app.use(convert(require('koa-static')(`${__dirname}/dist`)));
app.use(convert(views(`${__dirname}/dist`)));

//配置数据库
const mongoOptions = {
	user: 'gaoyu',
	pass: 'gjy321456',
  useNewUrlParser: true
};
mongoose.connect(`mongodb://127.0.0.1/gaoyublog`, mongoOptions); // 数据库链接
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

let server = app.listen(process.env.PORT||3002);