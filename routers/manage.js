/**
 * Created by Mahao on 2016/11/2.
 */
import controller from './tools/controller'
import * as api from './tools/api.js';
var _ = require("underscore"); // 引入underscore

export default class extends controller {

    renders() {
        this.router.get('/captain2', async (ctx, next) => {
            
            await ctx.render('act_captain/index', {});
        });
    }

    actions() {
    }
}
 