<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    
    document.cookie = "name=zhangsan;";
    sessionStorage.setItem('name',"zhangsan")
  }
}
</script>

<style>
  body{
    font-size: 12px;
    margin: 0px;
    background-color: rgb(228, 228, 228);
}


</style>
