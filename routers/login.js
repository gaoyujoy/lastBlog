import controller from './tools/controller'
var _ = require("underscore"); // 引入underscore

export default class extends controller {

    renders() {
        this.router.get('/login', async (ctx, next) => {
            await ctx.render('login/index.html', {});
        });
    }

    actions() {
        this.router.post('/login', async (ctx, next) => {
            var data = ctx.request.body;
            var userName = data.user;
            var pwd = data.password;
            var data = await this.DBModule.User.login(userName, pwd);
            if (data.code == 0) {
                ctx.session.user = data.data;
                ctx.session.redirect && (data.redirect_uri = ctx.session.redirect);
                ctx.session.redirect = null;
            }
            ctx.body = data;
        });
        this.router.post('/logout', async (ctx, next) => {
            ctx.session.user = null;
            ctx.body = {code: 0, msg: '退出成功'};
        });
        this.router.post('/changepwd', this.api.isLogin(), async (ctx, next) => {
            var data = ctx.request.body;
            var oldpwd = data.oldpwd;
            var pwd = data.pwd;
            var loginData = await this.DBModule.User.login(ctx.session.user.nickname, oldpwd);
            if (loginData.code == 0) {
                ctx.body = await this.DBModule.User.updateUser(loginData.data._id, { nickname: ctx.session.user.nickname, passWorld: this.api.encryption(pwd) });
                ctx.session.user = null;
            } else { 
                ctx.body = { code: 500, msg: '旧密码错误' };
            }
        })
    }
}
 