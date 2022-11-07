<template>
  <div id="project">
    <el-row>
      <el-col class="left" :span="12" >
        <el-link class="title left">{{user.username}}</el-link>
        <el-link class="title left">/{{project.name}}</el-link>
        <el-tag class="public-tag left" v-if="!project.is_Private">Public</el-tag>
        <el-tag class="public-tag left" v-if="project.is_Private">Private</el-tag>
      </el-col>
      <el-col class="right" :span="12">
        <el-button type="warning" @click="collect(project.id)" v-if="!is_Collected"><i class="el-icon-star-off">收藏</i></el-button>
        <el-button type="warning" @click="discollect(user.id,project.id)" v-if="is_Collected"><i class="el-icon-star-on">已收藏</i></el-button>
      </el-col>
    </el-row>
    <el-card class="project-panel">
      <el-row>
        <el-col :span="20" class="file-table">
          <el-button type="info" class="left">分支</el-button>
          <el-button type="info" class="left">上传</el-button>
          <el-button type="success" class="left">下载</el-button>
          <el-table stripe border :data="filelist">
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column prop="detail" label="说明"></el-table-column>
            <el-table-column prop="date_upgrade" label="修改时间"></el-table-column>
          </el-table>
        </el-col>
        <el-col class="info-panel" :span="4">
          <label class="left">关于</label>
          <i class="el-icon-s-tools right"></i>
          <el-col class="left"><i class="el-icon-star-off left"></i>
            <label class="left">{{project.star}}收藏</label>
          </el-col>
          <el-col class="left"><i class="el-icon-share left"></i>
            <label class="left">{{project.star}}分支</label>
          </el-col>
          <el-col class="left"><i class="el-icon-download left"></i>
            <label class="left ">{{project.star}}下载</label>
          </el-col>
          
          <el-col>
            <el-divider></el-divider>
            
            <div id="projectChats" class="charts" ref="projectchart" style="width:200px;height:150px"></div>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
          filelist:[{
            "name":'codedep.zip',
            "detail":'代码托管系统',
            "date_upgrade": "2022-09-29T03:04:40.726085Z",
          }],
          user:{
            "id": 1,
            "username": "bao",
            "nick_name": "ssrbao",
            "describe": "Tech otakus save the world!",
            "date_joined": "2022-09-29T03:04:40.726085Z",
            "mobile": "13666153702",
            "email": "san@qq.com",
          },
          is_Collected:false,
          projectname:'',
          project:{
              id :'1',
              name:'代码托管系统',
              describe:'此系统可以上传自己的代码到WEb端简单托管',
              is_Private:false,
              creator:1,
              updatetime:'2022-10-15T06:56:47.444236Z',
              lan:['Python','Vue','JavaScript'],
              star:5,
              iscollected:false,
          },
        }
    },
    methods:{
      getproject(){
        this.$axios.get('api/project')
      },
      getuserbyID(){

      },

      collect(project_id){
        let user_id = localStorage.getItem('id')
        this.$axios.post('/api/stars/iscollected',{'user_id':user_id,
        'project_id':project_id
      }).then(res =>{
        if(res.data.data){
          this.is_Collected = true
        }else{
          this.is_Collected = false
        }
      })
      },
      discollect(user_id,project_id){
        this.$axios.delete('api/stars/',{'user_id':user_id,
        'project_id':project_id
      }).then(res =>{
        if(res.data.code=='204'){
          this.is_Collected=false
          this.$message({
            message: '取消收藏成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: '取消收藏失败',
            type: 'warning'
          });
        }
      })
      },
      drawChart(){
        let bar_dv  = this.$refs.projectchart;
        let myChart = this.$echarts.init(bar_dv)
        var option = {
          title: {
              text: '语言占比概览',
              subtext: '',
              left: 'left'
            },
            label:{
              show:false
            },
            labelLine: {
              show: false
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'horizontal',
              top:'bottom',
              left: 'left'
            },
            series: [
              {
                name: 'language',
                type: 'pie',
                radius: '50%',
                avoidLabelOverlap: true,
                data: [
                  { value: 1048, name: 'Python' },
                  { value: 735, name: 'Other' },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };myChart.setOption(option)
      },
      is_stared(){
        let user_id = window.localStorage.getItem('id')
        let data = {'user_id':user_id,
                    'project_id': this.project.id   
      }
        this.is_Private = true
        this.$axios.post('api/stars/iscollected',data).then(res=>{
          bovalue=res.data.iscollected
          if(bovalue==true){
            this.is_Collected=true
          }else{
            this.is_Collected=false
          }
        })
        
      }
    },
    mounted(){
      this.drawChart();
      
    }
}
</script>

<style>
#project{
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 1.5;
}
.title{
  font-size: 20px;
}
.left{
  float: left;
}
.public-tag{
  margin-left: 10px;
}
.project-panel{
  padding-right: 10px;
}
.file-table{
  padding-right: 10px;
}
.info-panel{
 padding-left: 10px; 
}
</style>