import * as api from '../routers/tools/api.js';
var moment = require('moment');
export default class {
    constructor(mongoose, _) {

        this._ = _;

        var Schema = mongoose.Schema;

        var userSchema = new Schema({
            nickname: String,
            passWorld: String,
            date: {
                type: Date,
                default: Date.now
            }, // 创建时间
        });
        userSchema.virtual('created_at').get(function () {
            return moment(this.date).format('YYYY-MM-DD hh:mm:ss');
        });

        var User = mongoose.model('User', userSchema);
        this.saveUser = (userInfo, cb) => {
            var userObject = new User(userInfo);
            userObject.save( err => {
                if (err) {
                    cb('数据库错误');
                } else {
                    cb({code:0, msg: '插入成功'});
                }
            });
        };
        // 通过密码、昵称 登录
        this.login = (nickname, pwd) => {
            pwd = api.encryption(pwd)
            return new Promise((resolve, reject) => {
                User.findOne({ nickname: nickname, passWorld: pwd }, '-passWorld', (err, data)=> {
                    if (err) {
                        reject({ code: 500, msg:err });
                    }
                    else {
                        if (data) {
                            resolve({ code: 0, msg: '登录成功', data: data });
                        } else { 
                            resolve({ code: 500, msg: '用户名或密码错误' });
                        }
                    }
                });
            });
        };
        this.updateUser = (uid, userInfo) => { 
            return new Promise((resolve, reject) => {
                User.update({_id: uid}, {$set: userInfo},(err, data) =>{
                    if(err){
                        reject('数据库错误');
                    }
                    else{
                        resolve({code: 0, msg: '修改成功'});
                    }
                });
            });
        }
        this.findAdminByName = (nickname, cb) => { 
            User.find({ nickname: nickname }, 'nickname', (err, data)=> {
                if (err) {
                    cb('数据库错误');
                }
                else {
                    cb({code:0, data: data});
                }
            });
        }
        this.defaultAdmin();
    }

    defaultAdmin() {
        var self = this;
        this.findAdminByName(api.constantValue().admin, data => { 
            if (data.code == 0 && data.data.length == 0) { 
                var admin = {
                    nickname: api.constantValue().admin,
                    passWorld: api.encryption(api.constantValue().password)
                };
                self.saveUser(admin, data => {});
            }
        });
    }
}
