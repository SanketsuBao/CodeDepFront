<template>
<div class="login">
  <el-card id="login-card" class="login-card">
    <h3>登录代码托管系统</h3>
    <img class="logo-lg" src="../assets/logo.png">

    <el-form>
      <el-form-item label="账号" prop="name">
            <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
            <el-input v-model="password" show-password></el-input>
      </el-form-item>
    </el-form>    
    <el-row :gutter="20">
      <el-button round :span='12' type="primary" @click="login(username,password)">登录</el-button>
      
      <el-button round :span='12' plain ><router-link to="register">注册</router-link></el-button>
    </el-row>
    <div>
        <label>{{msg}}</label>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'login',
  data(){
    return {
      url:'/api/auth/',
      id:'',
      username:'',
      password: '',
      msg:''
    }
    
  },
  methods:{
    login() {
      this.$axios.post(this.url, {
        username: this.username,
        // password: this.$md5(this.password),
        password: (this.password)
      }).then((res) => {
        if (res.data.code == 200) {
          var token = res.data.token;
          var username = res.data.username;
          var id = res.data.id;
          //console.log(token);
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("username", username);
          window.localStorage.setItem("id", id);
          this.$router.push({ path: "/home" });
          this.$message({
                message: '登录成功！欢迎进入代码托管系统',
                type: 'success'
            });
        }else{
          this.$message({
                message: '账号或密码错误',
                type: 'error'
            });
        } 
      });
    },

  }
}

</script>

<style>
#login-card {
  width: 300px;
  padding: 0 auto;
}
.logo-lg {
  width: 100px;
}
</style>
