import controller from './tools/controller'

export default class extends controller {

    renders() {
    }

    actions() {
        this.router.post('/getabout', this.api.isLogin(), async (ctx, next) => {
            ctx.body = await this.DBModule.Aboutme.featchAboutme();
        });
        this.router.post('/editabout', this.api.isLogin(), async (ctx, next) => {
            var data = ctx.request.body;
            if (data._id) {
                ctx.body = await this.DBModule.Aboutme.updateAboutme(data._id, { content: data.content });
            } else { 
                ctx.body = await this.DBModule.Aboutme.saveAboutme({ content: data.content });
            }
        });
    }
}
 