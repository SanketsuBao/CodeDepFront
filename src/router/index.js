import Vue from 'vue'

//引用vue-router并取名为router
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import homepage from '@/components/Home'
import login from '@/components/Login'
import register from '@/views/Register'
import projectupload from '@//views/ProjectUpload'
import userdetail from '@/views/UserDetail'
import projectdetail from '@/views/Project'
import chat from '@/views/chat'
import search from '@/views/search'
// import filepondtest from '@/views/FilePondTest'
//使用Router
Vue.use(Router)
    //创建路由对象并配置路由规则
export default new Router({
    routes: [
        { path: '/', name: 'HelloWorld', component: HelloWorld, },
        { path: '/home', name: 'home', component: homepage },
        { path: '/login', name: 'login', component: login },
        { path: '/register', name: 'register', component: register },
        { path: '/upload', name: 'projectupload', component: projectupload },
        { path: '/chat', name: 'chat', component: chat },
        { path: '/users/:username', name: 'userdetail', component: userdetail },
        { path: '/projects/:projectname', name: 'projectdetail', component: projectdetail },
        // { path: '/filepondtest', name: 'filepondtest', component: filepondtest }
        { path: '/search', name: 'search', component: search }
    ]
})