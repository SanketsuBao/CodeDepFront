<template>
<div id="home" class="home">
    <el-row class="home">
        <el-col :span="6" id="projects">
            <div id="projects-title">最近的项目</div>
            <div class="myproject" v-for="project in projects" :key="project.id+projects">
              <router-link v-bind:to="'/projects/'+project.name" >
                <el-link>{{username+'/'+project.name}}</el-link>
            </router-link>
          </div>
          <router-link id="moreprojects" to="/myprojects">
            <el-link>
              更多项目？
            </el-link>
              
            </router-link>
        </el-col>
        <el-col :span="12">
          <div ><h3>欢迎进入代码托管系统</h3></div>
          <el-card>
            <span>
              开始一个项目
            </span>
            <router-link to="/upload"><el-button  type="primary">新建</el-button></router-link>
            
          </el-card>
          <div class="news"></div>
        </el-col>
        <el-col :span="6"><div></div></el-col>
    </el-row>
</div>
</template>

<script>
import router from '../router';

export default {
    components: {},
    name: "Home",
    data(){
        return{
            message: "登录成功",
            username:'',
            myprojects:[],
            projects: [{
                id:1,
                name: "代码托管系统",
                creator: "包包",
                collect: 100,
                create_time: 1643168758,
                contrib_times: 1,
                languege: [{
                    Python: "66%",
                    JavaScript: "34%",
                }, ],
            },
            {
                id:2,
                name: "代码托管系统",
                creator: "包包",
                collect: 100,
                create_time: 1643168758,
                contrib_times: 1,
                languege: [{
                    Python: "66%",
                    JavaScript: "34%",
                }, ],
            }, ],
        }
    },
    created(){
      this.username = window.localStorage.getItem('username')
      if(!window.localStorage.getItem('token')){
        router.push('/login')
        this.$message({message:'请先登录',type:'warning'})
      }
    },
    methods:{
      getMyProjects(){
        const user_id=localStorage.getItem('id')
        this.$axios.post('api/projects/myprojects/',{'id':user_id}).then(res =>{
          if (res.data.code==200){0
            this.myprojects=res.data.data
            this.$message({'message':res.data.message,
            'type':'success'})
          }else{
            this.$message({'message':'没有找到您的项目',
            'type':'success'})
          }
        })
      }
    },
}
</script>

<style>
#home{
  padding-top: 20px;
  background-color: cornflowerblue;
  width: 100%;
}
.home{
  width: 100%;
}
.left-list {
    width: 25%;
    background-color: cornflowerblue;
    height: 100%;
}

.mid-content {
    width: 50%;
    background-color: yellow;
}

.right-content {
    width: 25%;
    background-color: coral;
}

.left {
    float: left
}

.right {
    float: right;
}

.h-full{
  height: 100%;
}
.el-row {
    margin-bottom: 0px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  #projects{
    padding-top: 35px;
  }

  #moreprojects{
    padding-top: 30px;
  }
  .myproject{
    padding-top: 20px;
  }
</style>
