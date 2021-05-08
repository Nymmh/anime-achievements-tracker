<template>
    <div>
        <div style="top:5vh;right: 51.8vh;" class="searchcontainer mobilesize" id="livesearchbar" v-show="search.length>0">
            <template v-for="sr in this.search" >
                <div :key="search[sr]"><router-link :to="{name:'Profile',params:{username:sr.toLowerCase().charAt(0).toUpperCase()+sr.slice(1)}}">{{sr}}</router-link></div>
            </template>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"liveSearch",
    props:['user'],
    data (){
        return{
            search:[]
        }
    },
    methods:{
        liveSearch(e){
            if(e.keyCode == 8 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122){
                axios({
                    url:"https://anime-achievements-tracker.herokuapp.com/graphql",
                    method:'post',
                    data:{
                        query:
                        `query CheckProfile($username:String){
                            profiles(username:$username){
                                alid
                                username
                            }
                        }`,
                        variables:{
                            username:this.user
                        }
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(result=>{
                    this.search = [];
                    for(let ps in result.data.data.profiles){
                        this.search.push(result.data.data.profiles[ps].username)
                    }
                });
            }
        }
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
    color: #cadbec;
    font-style: normal;
}
.searchcontainer{
  position: absolute;
  background-color: #334661;
  width:12%;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: .5vh;
  z-index:1;
  color: #cadbec;
}
@media only screen and (min-width: 3839px) and (max-width: 3840px){
.mobilesize{
top: 8% !important;
right: 32% !important;
}
.searchcontainer{
  width:35%;
}
}
@media only screen and (max-width: 1440px){
.mobilesize{
top: 14% !important;
right: 32% !important;
}
.searchcontainer{
  width:35%;
}
}
@media only screen and (max-width: 1280px){
.mobilesize{
top: 14% !important;
right: 32% !important;
}
.searchcontainer{
  width:35%;
}
}
@media only screen and (max-width: 1025px){
.mobilesize{
top: 9% !important;
right: 32% !important;
}
.searchcontainer{
  width:35%;
}
}
@media only screen and (max-width: 835px){
.mobilesize{
top: 10% !important;
right: 32% !important;
}
.searchcontainer{
  position: absolute;
  background-color: #334661;
  width:35%;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: .5vh;
  z-index:1;
  color: #cadbec;
}
}
@media only screen and (max-width: 768px){
.mobilesize{
top: 11% !important;
right: 32% !important;
}
}
@media only screen and (max-width: 420px){
.searchcontainer{
  position: absolute;
  background-color: #334661;
  width:70%;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: .5vh;
  z-index:1;
  color: #cadbec;
}
.mobilesize{
top: 18.5% !important;
right: 18% !important;
}
}
@media only screen and (max-width: 413px){
.searchcontainer{
  position: absolute;
  background-color: #334661;
  width:70%;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: .5vh;
  z-index:1;
  color: #cadbec;
}
.mobilesize{
top: 22% !important;
right: 15% !important;
}
}
@media only screen and (max-width: 375px){
.mobilesize{
top: 24% !important;
right: 15% !important;
}
}
@media only screen and (max-width: 320px){
.mobilesize{
top: 33% !important;
right: 15% !important;
}
}
@media only screen and (max-width: 241px){
.mobilesize{
top: 69% !important;
right: 15% !important;
}
}
</style>