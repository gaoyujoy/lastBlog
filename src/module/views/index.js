
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
import 'iview/dist/styles/iview.css';

Vue.use(util);

import { Form, FormItem, Input, Icon, Button, Select, Option, Modal, Table, Page } from 'iview';
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Icon', Icon);
Vue.component('Button', Button);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Modal', Modal);
Vue.component('Table', Table);
Vue.component('Page', Page);


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

