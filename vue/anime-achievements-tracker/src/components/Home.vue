<template>
    <div>
        <div>
            <notifications classes="vue_notifications vue_notification_failed" group="failed" position="top center" width="400"/>
            <notifications classes="vue_notifications vue_notification_success" group="adding" position="top center" width="400"/>
            <h1>Anime Achievements Tracker for AniList</h1>
            <form action="" v-on:submit.prevent="onSubmit">
                <label for="username" style="padding-right:1vh;">Profile Search</label>
                <input type="search" name="username" id="username" v-model="username" placeholder="AniList Username" class="searchtextHome" @keyup="liveSearch" autocomplete="off"  @focus="showsearch=!showsearch" @blur="hidesearch">
                <input type="submit" value="Search" class="btn">
            </form>
            <livesearch v-if="username.length>0" :user="username" v-show="this.showsearch" ref="liveSearch"/>
            <div class="btn" style="width:11vh;margin:0 auto;border-radius:5px;position:relative;top:1.5vh;"><router-link :to="{name:'Compare'}" style="line-height: 100%;vertical-align: middle;"><span style="vertical-align: middle;">Compare</span></router-link></div>
        </div>
    </div>
</template>
<script>
import {profileSearch} from '../mixin/profileSearch.js'
import liveSearch from './livesearch';
export default {
    name: "Home",
    components:{'livesearch':liveSearch},
    mixins:[profileSearch],
    data(){
      return{
          showsearch:false,
      }
    },
    methods:{
      liveSearch(e){
          if(this.username.length>0 && e.keyCode == 8 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122){
              document.getElementById('livesearchbar').style.right = "87.8vh";
              document.getElementById('livesearchbar').style.top = "12vh";
              this.$refs.liveSearch.liveSearch(e);
          }
      },
      hidesearch(){
          if(this.showsearch){
              setTimeout(()=>{
                  this.showsearch = false;
              },200);
          }
      },
    }
}
</script>
<style>
.searchcontainer{
  position: absolute;
  width:12%;
  right: 87.8vh;
  top:12vh;
}
</style>
<style scoped>
a{
    
    text-decoration: none !important;
    color: #cadbec !important;
    font-style: normal !important;
}
.searchtextHome{
    border-radius: 5px 0 0 5px;
    border: none;
    outline-color: #334661;
    background-color: #334661;
    color:#cadbec;
    width: 35vh;
    padding: .5vh;
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
@media only screen and (max-width: 420px){
.searchtextHome{
    border-radius: 5px 0 0 5px;
    border: none;
    outline-color: #334661;
    background-color: #334661;
    color:#cadbec;
    width: 35vh;
    padding: .5vh;
}
}
@media only screen and (max-width: 413px){
.btn {
    border: none;
    border-radius: 5px 5px 5px 5px;
    background-color: #3e5871;
    color: #cadbec;
    cursor: pointer;
    margin-top: 2%;
}
}
@media only screen and (max-width: 375px){
.btn {
    padding-top: 2%;
    padding-bottom: 8%;
}
}
</style>