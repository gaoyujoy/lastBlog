import * as api from '../routers/tools/api.js';
var moment = require('moment');

export default class {
    constructor(mongoose, _) {

        this._ = _;

        var Schema = mongoose.Schema;

        var blogSchema = new Schema({
            title: String,
            content: Text,
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
            return moment(this.date).format('YYYY-MM-DD hh:mm:ss');
        });
        blogSchema.virtual('updated_at').get(function () {
            return moment(this.updateDate).format('YYYY-MM-DD hh:mm:ss');
        });
        var Blog = mongoose.model('Blog', blogSchema);
    }
}
