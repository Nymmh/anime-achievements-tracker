<template>
    <header>
      <nav>
        <div class="search">
            <div><router-link :to="{name:'Compare'}" style="line-height: 100%;vertical-align: middle;"><span style="vertical-align: middle;">Compare</span></router-link></div>
            <form action="" v-on:submit.prevent="onSubmit" style="margin:auto;" ref="searchUser">
                <input type="search" name="username" ref="username" v-model="username" placeholder="AniList Username" class="searchtext" autocomplete="off" @keyup="liveSearch" @focus="showsearch=!showsearch" @blur="hidesearch">
                <input type="submit" value="Search" class="btn">
            </form>
            <livesearch v-if="username.length>0" :user="username" v-show="this.showsearch" ref="liveSearch"/>
        </div>
      </nav>
        <notifications classes="vue_notifications vue_notification_failed" group="failedSearch" position="top center" width="400"/>
        <notifications classes="vue_notifications vue_notification_success" group="addingSearch" position="top center" width="400"/>
    </header>
</template>
<script>
import {profileSearch} from '../mixin/profileSearch.js'
import liveSearch from './livesearch';
export default {
  name: 'Searchbar',
  components:{'livesearch':liveSearch},
  mixins:[profileSearch],
  data(){
      return{
          showsearch:false
      }
  },
  watch:{
    $route (){
        this.username = "";
    }
  }, 
  methods:{
      liveSearch(e){
          if(this.username.length>0 && e.keyCode == 8 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122)this.$refs.liveSearch.liveSearch(e);
      },
      hidesearch(){
          if(this.showsearch){
              setTimeout(()=>{
                  this.showsearch = false;
              },200);
          }
      }
  }
}
</script>
<style scoped>
header{
    background-color: #2c3e50;
    position: absolute;
    top: 0;
    z-index: 1000;
    width: 100%;
}
nav{
    max-width: 85%;
}
.search{
    float: right;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-right: 13%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
}
.searchtext{
    border-radius: 5px 0 0 5px;
    border: none;
    outline-color: #334661;
    background-color: #334661;
    color:#cadbec;
    width: 18vh;
    padding: 2%;
}
.searchtext:focus{
    border: none;
    outline: none;
    box-shadow: 0 0 2px 0 #cadbec;
}
.btn{
    border: none;
    height: 2.5vh;
    border-radius: 0 5px 5px 0;
    background-color: #3e5871;
    color: #cadbec;
    cursor: pointer;
}
.btn:hover{
    border: 1px solid #cadbec;
}
</style>