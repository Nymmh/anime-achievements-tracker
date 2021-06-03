<template>
    <div style="color:white;">
        <loading v-if="this.showLoading"/>
        <vue-good-table v-show="this.showTable" :columns="columns" :rows="rows" theme="nocturnal" style="position: relative;top: -12vh;margin-bottom: 3vh;padding-left:2.5%;">
            <template slot="table-row" slot-scope="props">
                <span class="wrap" v-if="props.column.field == 'title'">
                    <a v-bind:href="'https://anilist.co/anime/'+props.row.id" target="_blank">{{props.row.title}}</a>
                </span>
                <span v-else>{{props.formattedRow[props.column.field]}}</span>
            </template>
        </vue-good-table>
    </div>
</template>
<script>
import Loading from './loading.vue'
import axios from 'axios'
import {VueGoodTable} from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
let query = `fragment MediaList on MediaListCollection{
  lists{
    entries{
      media{
        title{
          romaji
        }
        id
        meanScore
      }
    }
  }
}
query($username:String){
  MediaListCollection(userName:$username status:PLANNING type:ANIME sort:MEDIA_TITLE_ROMAJI){
    ...MediaList
  }
}`;
export default {
    name: "PlanningList",
    components:{'loading':Loading,VueGoodTable},
    props:['username'],
    data:()=>({
        data:"",
        animeList:{anime:[]},
        showLoading:true,
        showTable:false,
        columns:[
            {
                label:'Title',
                field:'title'
            },
            {
                label:'Mean Score',
                field:'globalscore',
                type:'number'
            },
        ],
        rows:[]
    }),
    mounted(){
        this.updateAnimeList();
    },
    methods:{
        updateAnimeList: function(){
            axios({
                url:"https://graphql.anilist.co",
                method:'post',
                    data:{
                        query:query,
                        variables:{
                            username:this.username
                        }
                    },
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(result=>{
                this.data = result.data.data.MediaListCollection.lists[0].entries;
                for(let al in this.data){
                    let anime = {id:0,title:"",userscore:0,globalscore:0,difference:0};
                    anime.id = this.data[al].media.id;
                    anime.title = this.data[al].media.title.romaji;
                    anime.globalscore = this.data[al].media.meanScore;
                    this.animeList.anime.push(anime);
                }
                this.rows = this.animeList.anime;
                this.showLoading = false;
                this.showTable = true;
            });
        },
    }
}
</script>
<style scoped>
.wrap{
  display: block;
  position: relative;
  width: 100%;
}
</style>