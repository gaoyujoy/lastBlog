
import Vue from 'vue'
import app from './index.vue'
import 'assets/less/re_iview.less';
// import util from 'assets/utils';
// import iView from 'iview'
import 'iview/dist/styles/iview.css';

// Vue.use(iView);
import { Form, FormItem, Input, Icon, Button } from 'iview';
import { ajaxFetch } from 'assets/utilComponents'
Vue.prototype.$ajaxFetch = ajaxFetch;
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Input', Input);
Vue.component('Icon', Icon);
Vue.component('Button', Button);

new Vue({
    el: '#app',
    components: { app }
})
