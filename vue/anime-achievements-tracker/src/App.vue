<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
*{
  box-sizing: border-box;
}
p,h1,h2,label{
    color: #cadbec;
}
body{
  margin: 0;
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
#header{
  background-color: #837C7C;
}
.vue_notifications{
  padding: 10px;
  margin: 15% 5px 5px;
  font-size: 1.1em;
  color: #ffffff;
  border-radius: 5px;
  z-index: 1000;
}
.vue_notification_success{
  background:#18bc9c !important;
}
.vue_notification_failed{
  background:#e43725 !important;
}
</style>
