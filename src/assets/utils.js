// import iView from 'iview';
import {ajaxFetch,loading } from 'assets/utilComponents'
import header from 'components/header'
import menu from 'components/menu'
// import 'iview/dist/styles/iview.css';
import 'assets/less/re_iview.less'; 
import marked from 'marked'
const install = function (Vue, opts = {}) {

    // Vue.use(iView);
    Vue.component('Header', header);
    Vue.component('Menu', menu);
    Vue.prototype.$ajaxFetch = ajaxFetch;
    Vue.prototype.$loading = loading;
    Vue.prototype.$marked = marked;
};

export default {install }
