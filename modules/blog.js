var moment = require('moment');

export default class {
    constructor(mongoose) {

        var Schema = mongoose.Schema;

        var blogSchema = new Schema({
            title: String,
            content: String,
            tag: String,
            info: String,
            // photo: String,
            view:  {
                type: Number,
                default: 0
            },
            updateDate: {
                type: Date,
                default: Date.now
            }, // 修改时间
            date: {
                type: Date,
                default: Date.now
            } // 创建时间
        });
        blogSchema.virtual('created_at').get(function () {
            return moment(this.date).format('YYYY年MM月DD日 HH:mm:ss');
        });
        blogSchema.virtual('updated_at').get(function () {
            return moment(this.updateDate).format('YYYY-MM-DD hh:mm:ss');
        });
        var Blog = mongoose.model('Blog', blogSchema);

        this.addBlog = blogInfo => { 
            return new Promise((resolve, rejects) => { 
                var blog = new Blog(blogInfo);
                blog.save((err, data)=> {
                    if (err) {
                        rejects('数据库错误');
                    } else {
                        resolve({code:0, msg: '插入成功', data: data});
                    }
                });
            })
        };

        this.getBlog = _id => { 
            return new Promise((resolve, rejects) => {
                Blog.findOne({ _id: _id }, (err, data) => {
                    if (err) {
                        rejects('数据库错误');
                    } else {
                        resolve({ code: 0, data: data });
                    }
                });
            })
        }

        this.updateBlog = (_id, blogInfo) => {
            return new Promise((resolve, rejects) => {
                blogInfo.updateDate = Date.now();
                Blog.update({ _id: _id }, { $set: blogInfo }, (err, data) => {
                    if (err) {
                        rejects('数据库错误');
                    } else {
                        resolve({ code: 0, msg: '修改成功', data: data });
                    }
                });
            })
        };

        this.deleteBlog = _id => {
            return new Promise((resolve, rejects) => {
                Blog.remove({ _id: _id }, err => {
                    if (err) {
                        rejects('数据库错误');
                    } else {
                        resolve({ code: 0, msg: '删除成功' });
                    }
                });
            })
        };

        this.featchBlogs = (where, skip, limit) => { 
            return new Promise((resolve, rejects) => {
                Blog.find(where)
                    .skip(skip)
                    .limit(limit)
					.sort({ date: -1 })
					.exec(function (err, data) {
						if (err) {
							reject('数据库错误');
						} else {
							resolve({ code: 0, data: data });
						}
					});
            })
        };

        this.featchAllBlogs = where => { 
            return new Promise((resolve, rejects) => {
                Blog.find(where, '_id')
					.exec((err, count) => {
						if (err) {
							reject('数据库错误');
						} else {
                            resolve({code: 0, total: count ? count.length : 0});
						}
					});
            })
        }
    }
}
