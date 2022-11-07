<template>
    <el-row :gutter="10" class="el-row" style="margin-left:0px;margin-right:0px">
        <el-col :span="6" class="head-link" >
            <router-link to="/home"><img id="logo" src="../assets/logo.png"/></router-link>
            <router-link to="/home"><el-link>首页</el-link></router-link>
            <!-- <el-link>热门项目</el-link> -->
        </el-col>
        <el-col :span="8">
            <el-input v-model="search_txt" placeholder="请输入内容" id="search-txt" ></el-input>
        </el-col>
        <el-col :span="2"><el-button @click="search">搜索</el-button></el-col>
        <el-col :span="4"  v-if="is_login"> 
        <el-dropdown :span="4">
            <span>
                <img id="user-img" src="../assets/user-img.jpg" v-if="false"/>
                <label class="username">{{username}}</label></span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <router-link v-bind:to="'users/'+username">
                        <el-link>
                            我的主页
                        </el-link>
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/upload"><el-link>新建项目</el-link></router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/user/myprojects"><el-link>我的项目</el-link></router-link>
                </el-dropdown-item>
                <el-dropdown-item divided>关于</el-dropdown-item>
                <el-dropdown-item ><el-link @click="logout">注销</el-link></el-dropdown-item>
            </el-dropdown-menu>
            
        </el-dropdown>
        <el-badge is-dot class="msg-icon" >
            <router-link to="/chat"><el-button class="" id="msg-icon" icon="el-icon-bell" type="primary"></el-button></router-link>
            </el-badge></el-col>
        <el-col :span="5" class="right user-img item-right item" v-else>
            <label type="primary"><router-link to="login">登录</router-link></label>
            /
            <label type="primary"><router-link to="register">注册</router-link></label>
        </el-col>
</el-row>
</template>

<script>
export default {
    name: 'navbar',
    data(){
        return{
            input:'',
            username: "",
            unreadmsg: 1,
            search_txt:'',
            is_login:false
        }
    },
    methods:{
        search(){
           const text= this.search_txt
           window.localStorage.setItem('search_text',text)
           this.$router.push('/search/')
        },
        is_login_fun() {
            if (token==none) {
                return false
            } else {
                return true
            }
            
        },
        logout() {
            // console.log('注销')
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('token');
            this.$router.push({ path: "/login" });
            this.is_login=false
            this.$message({
                message: '注销成功',
                type: 'success'
            });
        }
    },
    created:function(){
            this.username=window.localStorage.getItem('username');
            if(window.localStorage.getItem('token')==null){
                this.is_login =false
            }else{
                this.is_login =true
            };
    },
}
</script>

<style>

.head-link {
    font-size: 16px;
    height: 60px;
}
.el-row {
    list-style-type: none;
    text-align: center;
    height: 60px;
}

#logo {
    width: 50px;
}

.clear::after {
    content: "";
    display: block;
    clear: both;
} 

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.item-left{
    margin-left: 10px;
}

.item-right{
    margin-right: 10px;
}
.left {
    float: left;
}

.right {
    float: right;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
    font-size: 12px;
  }

#msg-icon {
    width: 36px;
    height: 36px;
    padding: 10px;
    margin-top :-10px
}
</style>
