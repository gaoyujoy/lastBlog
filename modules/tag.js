var moment = require('moment');

export default class {
    constructor(mongoose) {
        
        var Schema = mongoose.Schema;

        var tagSchema = new Schema({
            title: String,
            updateDate: {
                type: Date,
                default: Date.now
            }, // 修改时间
            date: {
                type: Date,
                default: Date.now
            } // 创建时间
        });
        tagSchema.virtual('created_at').get(function () {
            return moment(this.date).format('YYYY-MM-DD hh:mm:ss');
        });
        tagSchema.virtual('updated_at').get(function () {
            return moment(this.updateDate).format('YYYY-MM-DD hh:mm:ss');
        });
        var Tag = mongoose.model('Tag', tagSchema);

        this.addTag = tagInfo => { 
            return new Promise((resolve, reject) => { 
                var tag = new Tag(tagInfo);
                tag.save((err, data)=> {
                    if (err) {
                        reject('数据库错误');
                    } else {
                        resolve({code:0, msg: '插入成功', data: data});
                    }
                });
            })
        };

        this.updateTag = (_id, tagInfo) => {
            return new Promise((resolve, reject) => {
                tagInfo.updateDate = Date.now();
                Tag.update({ _id: _id }, { $set: tagInfo }, (err, data) => {
                    if (err) {
                        reject('数据库错误');
                    } else {
                        resolve({ code: 0, msg: '修改成功', data: data });
                    }
                });
            })
        };

        this.deleteTag = _id => {
            return new Promise((resolve, reject) => {
                Tag.remove({ _id: _id }, err => {
                    if (err) {
                        reject('数据库错误');
                    } else {
                        resolve({ code: 0, msg: '删除成功' });
                    }
                });
            })
        };

        this.featchTags = where => { 
            return new Promise((resolve, reject) => {
                Tag.find(where)
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

        // this.featchAllTags = where => { 
        //     return new Promise((resolve, reject) => {
        //         Tag.find(where, '_id')
		// 			.exec((err, count) => {
		// 				if (err) {
		// 					reject('数据库错误');
		// 				} else {
        //                     resolve({code: 0, total: count ? count.length : 0});
		// 				}
		// 			});
        //     })
        // }
    }
}
