var moment = require('moment');

export default class {
    constructor(mongoose) {
        
        var Schema = mongoose.Schema;

        var aboutmeSchema = new Schema({
            content: String,
            updateDate: {
                type: Date,
                default: Date.now
            }, // 修改时间
            date: {
                type: Date,
                default: Date.now
            } // 创建时间
        });
        aboutmeSchema.virtual('created_at').get(function () {
            return moment(this.date).format('YYYY-MM-DD hh:mm:ss');
        });
        aboutmeSchema.virtual('updated_at').get(function () {
            return moment(this.updateDate).format('YYYY-MM-DD hh:mm:ss');
        });
        var Aboutme = mongoose.model('Aboutme', aboutmeSchema);

        this.saveAboutme = info => { 
            return new Promise((resolve, reject) => { 
                var aboutme = new Aboutme(info);
                aboutme.save((err, data)=> {
                    if (err) {
                        reject('数据库错误');
                    } else {
                        resolve({code:0, msg: '插入成功', data: data});
                    }
                });
            })
        };

        this.updateAboutme = (_id, info) => {
            return new Promise((resolve, reject) => {
                info.updateDate = Date.now();
                Aboutme.update({ _id: _id }, { $set: info }, (err, data) => {
                    if (err) {
                        reject('数据库错误');
                    } else {
                        resolve({ code: 0, msg: '修改成功', data: data });
                    }
                });
            })
        };

        this.featchAboutme = () => { 
            return new Promise((resolve, reject) => {
                Aboutme.findOne({},(err, data) =>{
                    if (err) {
                        reject('数据库错误');
                    } else {
                        resolve({ code: 0, data: data });
                    }
                });
            })
        };
    }
}
