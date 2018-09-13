
import Vue from 'vue'
import app from './index.vue' 
import VueRouter from 'vue-router'
import posts from './posts/posts'
import tags from './posts/tags'
import change from './posts/change'
import editPost from './posts/editPost'
import about from './posts/about'
import detail from './posts/detail'
import layout from 'components/layout'
import util from 'assets/utils'

Vue.use(util);

Vue.use(VueRouter)
var router = new VueRouter({
    routes: [{
        path: '/',
        component: layout,
        redirect: '/posts',
        children: [
            {
                path: '/posts',
                name: 'posts',
                component: posts
            }, {
                path: '/tags',
                name: 'tags',
                component: tags
            }, {
                path: '/changePwd',
                name: 'change',
                component: change
            }, {
                path: '/posts/edit',
                name: 'add',
                component: editPost
            }, {
                path: '/posts/detail',
                name: 'detail',
                component: detail
            }, {
                path: '/about',
                name: 'about',
                component: about
            }
        ]
    }]
});
new Vue({
    el: '#app',
    router,
    components: { app }
})

