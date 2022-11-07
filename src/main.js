// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.esm.js'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';
import vuex from 'vuex'
import axios from 'axios'
// import vueFilePond from 'vue-filepond';
// import 'filepond/dist/filepond.min.css';

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import moment from 'moment'
Vue.prototype.$moment = moment

Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.use(Element);
Vue.use(vuex);
Vue.config.productionTip = false;

// const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

// 指定默认的请求域名
// axios.defaults.baseURL = "http://127.0.0.1:8000";
// 给每个请求拦截一下,添加请求Token信息
axios.interceptors.request.use(config => {
        config.headers.Authorization = 'token ' + localStorage.getItem("token");
        // config.headers.XCSRFToken = this.$cookie.get('key');
        return config;
    },
    err => {
        // 对请求错误做些什么
        Vue.prototype.$message.error('请求超时')
        return Promise.reject(err)
    });
// 拦截返回的数据
axios.interceptors.response.use(response => {
    // 接下来会在这里进行token过期的逻辑处理
    const { code } = response.data
        // 说明token过期了,获取新的token
    if (code === 401) {
        return refreshToken().then(res => {
            // 刷新token成功，将最新的token更新到header中，同时保存在localStorage中
            const { token } = res.data
            service.setToken(token)

            // 获取当前失败的请求
            const config = response.config
                //重置失败请求的配置
            config.headers['X-Token'] = token
            config.baseURL = ''
                //重试当前请求并返回promise
            return service(config)
        }).catch(res => {
            //重新请求token失败，跳转到登录页
            window.location.href = '/login '
        })
    }
    return response
}, error => {
    return Promise.reject(error)
})



/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    components: { App },
    template: '<App/>'
})