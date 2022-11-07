//引入相关模块
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

//当前文件必须在main.js中引入，才能触发
Vue.use(VueAxios, axios)