
const crypto = require('crypto');

export function encryption(str) {
    var hasher = crypto.createHash("md5");   // 创建一个用户加密的对象

    hasher.update(str);                     // str为需要加密的字符串，联系调用多次update是将多个字符串拼接

    var ret = hasher.digest('hex');         // 返回加密后的字符串，每个对象只能调用一次digest方法

    return ret;
}
// 常量
export function constantValue() {
    return {
        admin: 'admin',
        password: 'adminadmin'
    }
}

// 登录验证
export function isLogin() {
    return async (ctx, next) => {
        if (!ctx.session.user) {
            if (ctx.request.method.toLowerCase() == 'get') {
                ctx.session.redirect = ctx.request.url;
                ctx.redirect('/login');
            }else {
                ctx.body = {
                    code: 400,
                    msg: '未登录，请先登录'
                }
            }
        }else {
            await next();
        }
    }

}