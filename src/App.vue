<template>
  <div id="app">
    <el-container>
      <el-header><navbar/></el-header>
      <el-main><router-view class="router-v"/></el-main>
      <el-footer>
        <footer></footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components: { Navbar,Footer},
  name: "App",
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
  padding: 0;
}
.el-main {
  padding: 0;
  margin: auto;

}
.el-header {
  width: 100%;
  height: 60px;
  padding: 0;
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
