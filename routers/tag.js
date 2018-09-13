import controller from './tools/controller'

export default class extends controller {

    renders() {
        
    }

    actions() {
        this.router.post('/tags', this.api.isLogin(), async (ctx, next) => {
            var data = await this.DBModule.Tag.featchTags({});
            ctx.body = data;
        });
        this.router.post('/deletetag', this.api.isLogin(), async (ctx, next) => {
            var _id = ctx.request.body._id;
            var data = await this.DBModule.Tag.deleteTag(_id);
            ctx.body = data;
        });
        this.router.post('/addtag', this.api.isLogin(), async (ctx, next) => {
            var data = ctx.request.body;
            if (data._id && data._id != '') {
                var updateData = await this.DBModule.Tag.updateTag(data._id, { title: data.title });
                ctx.body = updateData;
            } else { 
                var data = await this.DBModule.Tag.addTag({ title: data.title });
                ctx.body = data;
            }
        });
    }
}
 