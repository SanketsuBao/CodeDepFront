<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="home">首页</router-link>
    <router-link to="login">登录</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components:{
  },
  data () {
    return {
      msg: 'Welcome to CodeDep'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
