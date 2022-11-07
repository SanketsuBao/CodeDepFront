<template>
<el-form id="uploadform" ref="form" :model="form" label-width="80px">
  <h3>上传项目</h3>
    <el-form-item label="项目名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="私有项目">
      <el-switch v-model="form.isPrivate"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="编程语言">
      <el-checkbox-group v-model="form.lan">
        <el-checkbox label="Python" name="Python"></el-checkbox>
        <el-checkbox label="Vue" name="Vue"></el-checkbox>
        <el-checkbox label="Java" name="Java"></el-checkbox>
        <el-checkbox label="C#" name="C#"></el-checkbox>
      </el-checkbox-group>
    </el-form-item> -->
    
    <!-- <el-form-item label="项目类型">
      <el-radio-group v-model="form.type">
        <el-radio label="应用程序"></el-radio>
        <el-radio label="Web前端"></el-radio>
        <el-radio label="Web后端"></el-radio>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="选择项目">
      <!-- <el-upload
        ref="uploadFile"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :auto-upload=false
        action="/api/storage/files/">
        <el-button  class="add-button" type="primary" size="small" @click="handleAddFolder">添加</el-button>
      </el-upload> -->
      <el-upload
        class="upload-demo"
        action="api/storage/files/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">请上传项目的压缩包，支持zip格式</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="项目简述">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
 export default {
      component:{
        
      },
      data() {
        return {
          form: {
            name: '',
            isPrivate: false,
            lan: false,
            type: '',
            desc: ''
          },
          fileList:[]
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
          let formData ={
            name : this.form.name,
            is_Private : this.form.isPrivate,
            // type:this.form.type,
            detail:this.form.desc,
            creator:window.localStorage.getItem('id')
          };
          this.$axios.post('/api/projects/',formData).then(res=>{
            if(res.data.code==400){
                this.$message.error(res.data.message);
              }else{
                this.$message({
                  'message':res.data.message,
                  'type':'success'
                });
                this.$router.push('/myprojects')

              }
          })
        },
        
        // 点击文件夹路径上传按钮
        handleAddFolder () {
          this.$nextTick(() => {
            this.$refs.uploadFile.$children[0].$refs.input.webkitdirectory = true
          })},
        // 文件夹路径上传之前钩子函数
        beforeUpload (file) {
        // file.path为文件夹的路径
        this.form.Folder = file.path
        },
        handleFilePondInit: function () {
          console.log("FilePond has initialized");

      },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
      }
    }
  </script>

<style>
#uploadform {
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 50px;
}
</style>