<template>
    <div>
        <div style="top:5vh;right: 51.8vh;" class="searchcontainer" id="livesearchbar" v-show="search.length>0">
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
</style>