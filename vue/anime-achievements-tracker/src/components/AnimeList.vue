<template>
    <div style="color:white;">
        <loading v-if="this.showLoading"/>
        <vue-good-table v-show="this.showTable" :columns="columns" :rows="rows" theme="nocturnal" style="position: relative;top: -12vh;margin-bottom: 3vh;padding-left:2.5%;">
            <template slot="table-row" slot-scope="props">
                <span class="wrap" v-if="props.column.field == 'title'">
                    <a v-bind:href="'https://anilist.co/anime/'+props.row.id" target="_blank">{{props.row.title}}</a>
                </span>
                <span class="wrap" v-else-if="props.column.field == 'difference'">
                    <span v-if="props.row.difference > 0" class="rowgreen">+{{props.row.difference}}</span>
                    <span v-else-if="props.row.difference < 0" class="rowred">{{props.row.difference}}</span>
                    <span v-else-if="props.row.difference == 0" class="rowgrey">{{props.row.difference}}</span>
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
      score(format:POINT_100)
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
  MediaListCollection(userName:$username status:COMPLETED type:ANIME sort:SCORE_DESC forceSingleCompletedList:true){
    ...MediaList
  }
}`;
export default {
    name: "AnimeList",
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
                label:'User Score',
                field:'userscore',
                type:'number'
            },
            {
                label:'Mean Score',
                field:'globalscore',
                type:'number'
            },
            {
                label:'Difference',
                field:'difference',
                type:'number'
            }
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
                    anime.userscore = this.data[al].score;
                    anime.globalscore = this.data[al].media.meanScore;
                    anime.difference = (this.data[al].score-this.data[al].media.meanScore)
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
.rowgreen{
  background-color: rgba(0, 255, 0, 0.2);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -0.75rem;
  bottom: -1.9rem;
  padding: 0.75rem;
}
.rowred{
  background-color: rgba(255, 0, 0, 0.2);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -0.75rem;
  bottom: -1.9rem;
  padding: 0.75rem;
}
.rowgrey{
  background-color: rgba(129, 131, 133, 0.2);
  color: white;
  position: absolute;
  left: -0.75rem;
  right: -0.75rem;
  top: -0.75rem;
  bottom: -1.9rem;
  padding: 0.75rem;
}
</style>