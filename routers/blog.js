import controller from './tools/controller'
import fs from 'fs';
var formidable = require('formidable');

export default class extends controller {

    renders() {
        this.router.get('/', this.api.isLogin(), async (ctx, next) => {
            await ctx.render('views/index.html', {});
        });
    }

    actions() {
        this.router.post('/blogs', this.api.isLogin(), async (ctx, next) => {
            var params = ctx.request.body;
            var page = params.page || 1;
            var keyword = params.keyword || '';
            var tag = params.tag || '';
            var where = {};
            if (keyword != '') {
                where = { "$or": [{ title: { $regex: `${keyword}` } }, { content: { $regex: `${keyword}` } }] };
            }
            if (tag != '' && tag != '0') { 
                where.tag = tag;
            }
            var data = await this.DBModule.Blog.featchBlogs(where, (page - 1) * 10, 10);
            if (data.data && data.data.length > 0) { 
                var newDatas = [];
                this._.each(data.data, item => { 
                    var newData = item.toObject();
                    newData.created_at = item.created_at;
                    newDatas.push(newData);
                })
                data = { code: 0, data: newDatas };
            }
            var count = await this.DBModule.Blog.featchAllBlogs(where);
            data.total = count.total;
            ctx.body = data;
        });
        this.router.post('/getblog', this.api.isLogin(), async (ctx, next) => {
            var _id = ctx.request.body._id;
            var data = await this.DBModule.Blog.getBlog(_id);
            if (data.data) { 
                var newData = data.data.toObject();
                newData.created_at = data.data.created_at;
                data = { code: 0, data: newData };
            }
            if (ctx.request.body.view) { 
                await this.DBModule.Blog.updateBlog(_id, { view: (data.data.view)||0+1 });
                data.data.view += 1;
            }
            ctx.body = data;
        });
        this.router.post('/deleteblog', this.api.isLogin(), async (ctx, next) => {
            var _id = ctx.request.body._id;
            var data = await this.DBModule.Blog.deleteBlog(_id);
            ctx.body = data;
        });
        this.router.post('/addblog', this.api.isLogin(), async (ctx, next) => {
            var data = ctx.request.body;
            if (data._id && data._id != '') {
                var updateData = await this.DBModule.Blog.updateBlog(data._id, { title: data.title,content: data.content, tag: data.tag, info: data.info });
                ctx.body = updateData;
            } else { 
                var data = await this.DBModule.Blog.addBlog({ title: data.title,content: data.content, tag: data.tag, info: data.info });
                ctx.body = data;
            }
        });
        this.router.post('/actfiles', this.api.isLogin(), async (ctx, next) => {
            ctx.body = {};
            var formFun = function () {
                return new Promise(function (resolve, reject) {
                    var form = new formidable.IncomingForm(ctx.req);
                    form.uploadDir = "dist/upfile/backup/";
                    form.parse(ctx.req, function (err, fields, files) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve();
                            ctx.request.body = fields;
                            ctx.request.files = files;
                        }
                    })
                });
            };
            await formFun();
            var file = ctx.request.files.upfile;
            var fileName = file.name, fileType = fileName.split('.')[1];
            var tempfilepath = file.path;
            var resPath = 'dist/upfile/downloads/upload_' + tempfilepath.split('upload_')[1] + '.' + fileName.split('.')[1];
            await new Promise(function (resolve, reject) {
                fs.rename(file.path, resPath, async (err) => {
                    if (err) {
                        ctx.body = {
                            "code": 0,
                            "msg": err
                        };
                        reject()
                    }else {
                        ctx.body = {
                            "code": 0,
                            "msg": "接收成功",
                            "data": {
                            "path": 'upfile/downloads/upload_' + tempfilepath.split('upload_')[1] + '.' + fileName.split('.')[1]
                            } // 返回注册码
                        }
                        resolve();
                    }
                })
            })
        });
    }
}
 