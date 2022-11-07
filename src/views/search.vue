<template>
    <div>
        <el-row>
            <el-input class="search-input" v-model="search_text"></el-input>
            <el-button @click="searchUser">搜索用户</el-button>
            <el-button @click="searchProject">搜索项目</el-button></el-row>
        <el-col>
            <label>搜索结果</label>
        </el-col>
            <el-divider></el-divider>
        <div class="results">
            <div class="user-item" v-for="user in user_results" :key="user.id">
                <el-col>
                    <router-link v-bind:to='/users/+user.username'>
                    <el-link class="item-username left">{{user.username}}</el-link></router-link>
                    <label class="item-nickname left">{{user.nick_name}}</label></el-col>
                <el-col>
                    <label  class="item-describe left">
                    {{user.describe}}
                </label></el-col>
                <el-divider></el-divider>
            </div>
        </div>
    </div>
</template>

<script>
export default {
 data(){
    return{
        user_results:[],
        project_results:[],
        search_text:''
    }
 },
 methods:{
    searchUser(){
        const text=window.localStorage.getItem('search_text')
        if(text !=''){
            let data = {'q':text}
                this.$axios.post('api/users/searchu/',data).then(res=>{
                    let results =res.data.data
                    console.log(results)
                    if(results==''){
                        console.log('无结果')
                        this.$message({'message': '暂无结果'})
                    }else{
                        this.user_results=results
                    }
                })
        }
        
    },
    searchProject(){
        const text=window.localStorage.getItem('search_text')
        this.$axios.get('api/projects/search/',{'q':text}).then(res=>{
            if(res.data.results==''){
                this.$message({'message': '暂无结果'})
            }else{
                this.Projects_results=res.data.results
            }
        })
    }
 },
 created(){
    this.searchUser()
 }
}
</script>

<style>
.user-item{
    height: 60px;
    width: 30%;
}
.item-username{
    padding-top: 10px;
    font-size: 18px;
    color: black;
}
.item-nickname{
    padding-top: 14px;
    padding-left: 5px;
    font-size:14px;
}
.item-describe{
    padding-top: 20px;
}
.search-input{
    padding-top: 20px;
    width: 50%;
}
.results{
    padding-left: 20px;
    padding-right: 20px;
}
.left{
    float: left;
}
</style>