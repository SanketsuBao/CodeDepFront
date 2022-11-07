<template>
  <el-card class="box-card">
        <el-form
         label-position="left" 
         label-width="80px" 
         :model="formRegister"
         :rules="rules"
         ref="formRegister">
         <el-form-item  prop="name">账号注册</el-form-item>
          <el-form-item label="账号" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formRegister.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formRegister.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addUser">注册</el-button>
          </el-form-item>
        </el-form>
  </el-card>
</template>

<script type="text/javascript">
  export default {
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('账户不能为空!'))
        }else{
          cb(); // 将判断传递给后面
        }

      }
      let checkEmail = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('邮箱不能为空!'))
        }else{
          cb(); // 将判断传递给后面
        }

      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('密码不能为空!'))
         }else{
          cb();
         }
      }
      let checkPasswordAgain = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('再次输入密码不能为空!'))
         }else if(value !== this.formRegister.password){
          return cb(new Error('两次输入密码不一致!'));
         }else{
          cb();
         }
      }

      return{
        formRegister:{
          name: '',
          email:'',
          password: '',
          checkPassword: ''
        },
        rules:{
          name:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          email:[
            {validator:checkEmail,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ],
          checkPassword:[
            {validator:checkPasswordAgain,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      // 增加单条
      addUser(){
        let user = this.formRegister;
        let formData = {
          username: user.name,
          password: user.password,
          email:user.email
        };
        // 表单验证
        this.$refs['formRegister'].validate((valid)=>{
          if(valid){
            console.log(formData)
            this.$axios.post('/api/users/register/',formData)
            .then(res => {
              console.dir(res.data)
              if(res.data.code==400){
                this.$message.error(res.data.message);
              }
              else{
                this.$router.push('/login')
              }
            })
            .catch(err => {
                this.$message.error(`${err.message}`)
            })
          }else{
            this.$message.error('验证失败!')
            return false;
          }
        })
      }
    }
  }
</script>

<style>
.box-card {
  width: 300px;
  padding: 0 ;
  float: right;
}
</style>