
import Vue from 'vue'
import app from './index.vue'
import 'assets/less/re_iview.less';
import util from 'assets/utils';

Vue.use(util);
new Vue({
    el: '#app',
    components: { app }
})
