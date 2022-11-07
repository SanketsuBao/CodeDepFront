<template>
  <el-card class="panel">
    <el-row class="panel">
      <el-col class="contacts left-panel" :span="8">
        <label class="label-contacts">联系人</label>
        <el-input class="search-contacts" placeholder="搜索用户" v-model="search_contacts"></el-input>
        
        <div class="user-item left" v-for="user in contacts" :key="user" >
          <el-avatar size="medium" :src="circleUrl"></el-avatar>
          <label class="username-item">{{user}}</label>
        </div>
      </el-col>
      <el-col class="right-panel" :span="16"> </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      search_contacts:'',
      contacts:['abao','abaosss'],
      circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
    
  }
}
</script>

<style>
.search-contacts{
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.left{
  float: left;
}
.panel{
  width: 80%;
  height: 600px;
}
.contacts{
  background-color: darkgray;
  height: 100%;
}
.label-contacts{
  width: 100%;
  padding-top: 20px;
}
.user-item{
  width: 90%;
  height: 60px;
}
</style>