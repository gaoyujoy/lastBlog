import iLoading from 'components/boxLoading'
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

var loadingComponent = null;

const loading = {
    show(message) {
        if (!loadingComponent) {
            const div = document.createElement('div');
            div.innerHTML = `<i-loading></i-loading>`;
            document.body.appendChild(div);
            loadingComponent = new Vue({
                el: div,
                components: { iLoading }
            }).$children[0];
        }
        loadingComponent.show(message);
    },
    hide() { 
        loadingComponent && loadingComponent.hide();
    }
}
function toFetch(method, url, params, successCallback, errorCallback,message,isUpfile) { 
    message||message!='' && loading.show(message);
    successCallback = successCallback || function () { };
    errorCallback = errorCallback || function () { };
    axios({ 
        method: method,
        url: url,
        data: method == 'post' ? params : {},
        params: method == 'get' ? params : {},
        headers: {
            'Content-Type': isUpfile ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        loading.hide();
        if (response.data.code != 0) {
            errorCallback(response.data.msg);
        } else { 
            successCallback(response.data);
        }
    }).catch(function (error){
        loading.hide();
        errorCallback(error);
    });
}
const ajaxFetch = {
    get(url, params, successCallback, errorCallback, message) {
        toFetch('get', url, params, successCallback, errorCallback,message);
    },
    post(url, params, successCallback, errorCallback, message, isUpfile) {
        toFetch('post', url, qs.stringify(params), successCallback, errorCallback,message,isUpfile)
    }
}
export { ajaxFetch,loading};