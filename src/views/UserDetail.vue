<template>
<el-row>
  <el-col :span="6" id="leftside">
    <el-card id="userinfo-card" class="left" v-loading="userloading">
      <el-avatar id="userimg" src="https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500"></el-avatar>
        <div id="username">{{user.username}}</div>
        <div id="nickname">{{user.nick_name}}</div>
        <div id="describe">{{user.describe}}</div>
        <div id="uselan">
          <li style="font-size:12px;">擅长的编程语言</li>
          <el-tag class="lan-tag" type="info" v-for="lan in user.lan" :key="lan">{{lan}}</el-tag>
        </div>
    </el-card>
  </el-col>
  <el-col :span="16">
    <el-tabs id="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户主页" name="first">
          <div id="echartss" style="width: 600px;height:400px;" ref="chart"></div>
        </el-tab-pane>
        <el-tab-pane label="我的项目" name="second">
          <el-table id="myprojects" class="projects" :data="projects">
            <el-table-column
              prop="name"
              label="项目名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="updatetime"
              label="更新时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="star"
              label="收藏数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="项目简介"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="editproject(scope.index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-dialog title="编辑项目" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="项目名称">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目简介">
              <el-input v-model="form.describe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否私有">
              <el-switch 
                v-model="form.isPrivate"
                active-color="#66ccff"
                inactive-color="#808080">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteproject">删除项目</el-button>
              <el-button type="primary" @click="upgradeprojecs">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-tab-pane label="收藏管理" name="fourth">
          <el-table id="myprojects" class="projects" :data="collections">
            <el-table-column
              prop="name"
              label="项目名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="updatetime"
              label="更新时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="项目简介"
            >
            </el-table-column>
            <el-table-column
              prop="star"
              label="收藏数"
              width="80">
            </el-table-column>
            <el-table-column
                label="操作"
                width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="info"
                size="small">
                取消收藏
              </el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
  </el-col>
  
</el-row>

</template>
<script>
export default {
  name:'UserDetail',
  data(){
    return{
      activeName: 'first',
      userloading:false,
      dialogFormVisible:false,
      form:{
        name:'',
        describe:'',
        isPrivate:false
      },
      user:{
        "username": "baossss32",
        "nick_name": "baossss321",
        "describe": "tudent",
        "date_joined": "2022-10-15T06:56:47.444236Z",
        "email": "",
        "lan":['Python', 'C++','Java']
      },
      projects:[
        {
          id :'1',
          name:'代码托管系统',
          describe:'此系统可以上传自己的代码到WEb端简单托管',
          updatetime:'2022-10-15T06:56:47.444236Z',
          lan:['Python','Vue','JavaScript'],
          star:5,
          iscollected:false,
        },
        {
          id :'2',
          name:'CodeDep',
          updatetime:'2022-10-12T06:56:47.444236Z',
          lan:['Python','Vue','JavaScript'],
          star:60,
          iscollected:true,
        }
      ],
      collections:[],

    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getUserdetail(){
        username=window.localStorage.getItem('username')
        this.$axios.get('/api/users/'+username+'/').then((res)=>{
          if (res.data==null){
            console.log("获取用户信息失败")
            this.$message({
              message:'获取信息失败！',
              type:'error'
            })
          }else{
            this.user.nick_name = res.data.user.nick_name
            this.user.username  = username
            this.user.describe = res.data.user.describe
            // this.userloading=true
          }
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      deleteproject(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      drawChart() {
        let bar_dv  = this.$refs.chart;
        if (bar_dv){
          let myChart = this.$echarts.init(bar_dv)
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: '上传概览'
            },
            tooltip: {},
            legend: {
              data: ['上传次数']
            },
            xAxis: {
              data: ['10.10', '10.11', '10.12', '10.13', '10.14', '10.15']
            },
            yAxis: {},
            series: [
              {
                name: '上传',
                type: 'bar',
                data: [5, 0, 1, 1, 3, 2]
              }
            ]
          };myChart.setOption(option)
        }
         
        
      },
      editproject(index){
        this.dialogFormVisible = true
        const project = this.projects[index]
      },
      upgradeprojecs(from){

      },
      collect(project_id){
        const user_id = localStorage.getItem('id')
        project_id=this.projects[1].id
        this.$axios.post('/api/stars/iscollected/',{'user_id':user_id,
        'project_id':project_id
      }).then(res =>{
        if(res.data.data){
          is_collected = true
        }else{
          is_collected = false
        }
      })
      },
      discollect(user_id,project_id){
        this.$axios.delete('api/stars/',)
      },
      getCollections(){
        const id = localStorage.getItem('id')
        this.$axios.post('api/stars/'+id+'/').then(res=>{
          if(res.data.starlist!=''){
            this.collections=res.data.starlist
            console.log('获取收藏列表成功')
          }
        })
      },
      getMyProjects(){
        const id = localStorage.getItem('id')
        this.$axios.post('api/stars/'+id+'/').then(res=>{
          if(res.data.starlist!=''){
            console.log(res.data.starlist)
            this.collections=res.data.starlist
            console.log('获取收藏列表成功')
            
          }
        })
      }
    },
    created(){
      
    },
    computed:{

    },
    mounted(){
      this.getUserdetail();
      this.drawChart();
      this.getCollections();
    }
};
</script>

<style>
#lefside,#userinfo-card{
  width: 100%;
  height: 400px;
}
#userimg {
  width: 180px;
  height: 180px;
}

#tabs{
  margin-left: 20px;
}
#username {
  font-size: 24px;
  color: black;
  padding-top: 10px;
}
#nickname {
  font-size: 20px;
  color: gray;
  padding-top: 5px;
}
#describe {
  padding-top: 20px;
}
.lan-tag{
  margin-left: 5px;
}
#uselan{
  padding-top: 5px;
  margin-bottom: 5px;
}
</style>