<template>
    <div><navbar/>
        <notifications classes="vue_notifications vue_notification_failed" group="failedSearch" position="top center" width="400"/>
        <notifications classes="vue_notifications vue_notification_success" group="addingSearch" position="top center" width="400"/>
        <div class="grid">
            <div class="container">
                <form action="" v-on:submit.prevent="searchProfile" style="position: relative;top: 25%;">
                    <input type="search" name="username1" v-model="username1" placeholder="AniList Username" class="searchtext">
                    <input type="submit" value="Search" class="btn">
                </form>
            </div>
            <div class="container">
                <form action="" v-on:submit.prevent="searchProfile" style="position: relative;top: 25%;">
                    <input type="search" name="username2" v-model="username2" placeholder="AniList Username" class="searchtext">
                    <input type="submit" value="Search" class="btn">
                </form>
            </div>
        </div>
            <comparedata :userdata.sync="this.userdata" :loadingShow.sync="loadingShow" :pageuserdata.sync="pageuserdata" :compatibility.sync="this.compatibility"/>
    </div>
</template>
<script>

import SearchBar from './Searchbar.vue'
import CompareData from './CompareData.vue'
import axios from 'axios'
let query = `query($username:String){
                User(name:$username){
                    id
                    name
                    avatar{
                        medium
                    }
                    statistics{
                        anime{
                            count
                            episodesWatched
                            minutesWatched
                            meanScore
                            statuses {
                                status
                                count
                                minutesWatched
                            }
                            formats {
                                format
                                count
                                meanScore
                                minutesWatched
                            }
                            genres {
                                genre
                                count
                                meanScore
                                minutesWatched
                            }
                        }
                    }
                }

            }`;
let listQuery = `query($username:String){
    MediaListCollection(userName:$username status:COMPLETED type:ANIME forceSingleCompletedList:true sort:MEDIA_ID){
        lists{
            entries{
                mediaId
                score
            }
        }
    }
    User(name:$username){
        mediaListOptions{
            scoreFormat
        }
    }
}`;
export default {
    name: "Compare",
    components:{'navbar':SearchBar,'comparedata':CompareData},
    data(){
        return{
            username1:"",
            username2:"",
            userdata:{user1:{name:"",avatar:"",anime:{count:0,episodes:0,minutes:0,meanscore:0,planning:0,current:0,formats:[],genres:[]}},user2:{name:"",avatar:"",anime:{count:0,episodes:0,minutes:0,meanscore:0,planning:0,current:0,formats:[],genres:[]}}},
            listrunning:false,
            commonanime:{anime:[]},
            scorediff:0,
            compatibility:0,
            loadingShow:false,
            pageuserdata:false,
        }
    },
    methods:{
        searchProfile: function(){
            if(this.username1 && this.username2){
                this.loadingShow = true;
                this.pageuserdata = false;
                this.commonanime = {anime:[]};
                this.userdata = {user1:{name:"",avatar:"",anime:{count:0,episodes:0,minutes:0,meanscore:0,planning:0,current:0,formats:[],genres:[]}},user2:{name:"",avatar:"",anime:{count:0,episodes:0,minutes:0,meanscore:0,planning:0,current:0,formats:[],genres:[]}}};
                this.scorediff = 0;
                this.compatibility = 0;
                if(this.username1){
                axios({
                    url:"https://graphql.anilist.co",
                    method:'post',
                    data:{
                        query:query,
                        variables:{
                            username:this.username1
                        }
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(username1Res=>{
                    axios({
                        url: "https://graphql.anilist.co",
                        method: 'post',
                        data: {
                            query: query,
                            variables: {
                                username: this.username2
                            }
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(username2Res=>{
                        let User1 = username1Res.data.data.User,
                            User2 = username2Res.data.data.User,
                            format = User1.statistics.anime.formats,
                            format2 = User2.statistics.anime.formats,
                            genre = User1.statistics.anime.genres,
                            genre2 = User2.statistics.anime.genres;
                        this.userdata.user1.name = User1.name;
                        this.userdata.user2.name = User2.name;
                        this.userdata.user1.avatar = User1.avatar.medium;
                        this.userdata.user2.avatar = User2.avatar.medium;
                        this.userdata.user1.anime.count = User1.statistics.anime.count;
                        this.userdata.user2.anime.count = User2.statistics.anime.count;
                        this.userdata.user1.anime.episodes = User1.statistics.anime.episodesWatched;
                        this.userdata.user2.anime.episodes = User2.statistics.anime.episodesWatched;
                        this.userdata.user1.anime.minutes = User1.statistics.anime.minutesWatched;
                        this.userdata.user2.anime.minutes = User2.statistics.anime.minutesWatched;
                        this.userdata.user1.anime.meanscore = User1.statistics.anime.meanScore;
                        this.userdata.user2.anime.meanscore = User2.statistics.anime.meanScore;
                        this.userdata.user1.anime.planning = User1.statistics.anime.statuses[1].count || 0;
                        this.userdata.user2.anime.planning = User2.statistics.anime.statuses[1].count || 0;
                        this.userdata.user1.anime.current = User1.statistics.anime.statuses[2].count || 0;
                        this.userdata.user2.anime.current = User2.statistics.anime.statuses[2].count || 0;
                        for(let fr in format){
                            this.userdata.user1.anime.formats.push({format:format[fr].format.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()).replace(/(_)/g,' '),count:format[fr].count,meanscore:format[fr].meanScore,minutes:format[fr].minutesWatched})
                        }
                        for(let ft in format2){
                            this.userdata.user2.anime.formats.push({format:format2[ft].format.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()).replace(/(_)/g,' '),count:format2[ft].count,meanscore:format2[ft].meanScore,minutes:format2[ft].minutesWatched})
                        }
                        for(let gn in genre){
                            this.userdata.user1.anime.genres.push({genre:genre[gn].genre,count:genre[gn].count,meanscore:genre[gn].meanScore,minutes:genre[gn].minutesWatched})
                        }
                        for(let gr in genre2){
                            this.userdata.user2.anime.genres.push({genre:genre2[gr].genre,count:genre2[gr].count,meanscore:genre2[gr].meanScore,minutes:genre2[gr].minutesWatched})
                        }
                    })
                    this.getLists();
                })
            }
            }
        },
        getLists:function(){
            if (!this.listrunning) {
                this.listrunning = true;
                axios({
                    url: "https://graphql.anilist.co",
                    method: 'post',
                    data: {
                        query: listQuery,
                        variables: {
                            username: this.username1
                        }
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(user1ListRes => {
                    let List = user1ListRes.data.data.MediaListCollection.lists[0];
                    let user1ScoreFormat = user1ListRes.data.data.User.mediaListOptions.scoreFormat;
                    axios({
                        url: "https://graphql.anilist.co",
                        method: 'post',
                        data: {
                            query: listQuery,
                            variables: {
                                username: this.username2
                            }
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(user2ListRes => {
                        let List2 = user2ListRes.data.data.MediaListCollection.lists[0];
                        let user2ScoreFormat = user2ListRes.data.data.User.mediaListOptions.scoreFormat;
                        for(let li in List.entries){
                            for(let lt in List2.entries){
                                if(List.entries[li].mediaId === List2.entries[lt].mediaId){
                                    var score1 = List.entries[li].score || 0,
                                        score2 = List2.entries[lt].score || 0
                                    if(user1ScoreFormat == "POINT_10" && score1 != 0)score1 = (score1*10);
                                    else if(user1ScoreFormat == "POINT_10_DECIMAL" && score1 != 0){
                                        if(score1 == 10) (score1*10);
                                        else score1 = ((score1/10)*100);
                                    }else if(user1ScoreFormat == "POINT_5" && score1 != 0)score1 = (score1*20);
                                    else if(user1ScoreFormat == "POINT_3" && score1 != 0){
                                        if(score1 == 2) score1 = 50;
                                        else if(score1 == 3) score1 = 100;
                                    }
                                    if(user2ScoreFormat == "POINT_10" && score2 != 0)score2 = (score2*10);
                                    else if(user2ScoreFormat == "POINT_10_DECIMAL" && score2 != 0){
                                        if(score2 == 10) (score2*10);
                                        else score2 = ((score2/10)*100);
                                    }else if(user2ScoreFormat == "POINT_5" && score2 != 0)score2 = (score2*20);
                                    else if(user2ScoreFormat == "POINT_3" && score2 != 0){
                                        if(score2 == 2) score2 = 50;
                                        else if(score2 == 3) score2 = 100;
                                    }
                                    let scoreDiff = Math.abs(score1 - score2)
                                    this.commonanime.anime.push({id:List.entries[li].mediaId,score1:score1,score2:score2,diff:scoreDiff});
                                    this.scorediff = (this.scorediff + scoreDiff);
                                }
                            }
                        }
                        let comp = (this.scorediff/this.commonanime.anime.length);
                        this.compatibility = (100 - comp).toFixed(2);
                        this.loadingShow = false;
                        this.pageuserdata = true;
                        this.listrunning = false;
                    });
                });
            }
        }
    }
}
</script>
<style>
*{
    font-family: Arial, Helvetica, sans-serif;
}
a{
    text-decoration: none;
    color: #cadbec;
    font-style: normal;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2vh 0px;
  grid-template-areas:
    ". ."
    ". .";
  max-width: 85%;
  margin: 0 auto;
  position: relative;
  top: 7vh;
}
.container{
    width: 90%;
    margin: 0 auto;
    background-color: #334661;
    height: 70px;
    border-radius: 5px;
}
.usercontainer{
    width: 90%;
    margin: 0 auto;
    background-color: #334661;
    border-radius: 5px;
}
.usergrid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1vh 0px;
  padding-bottom: 2%;
}
.searchtext{
    border-radius: 5px 0 0 5px;
    border: none;
    outline-color: #2c3e50;
    background-color: #2c3e50;
    color:#cadbec;
    width: 18vh;
    padding: 1%;
}
.searchtext:focus{
    border: none;
    outline: none;
    box-shadow: 0 0 2px 0 #cadbec;
}
.btn{
    border: none;
    height: 3vh;
    border-radius: 0 5px 5px 0;
    background-color: #3e5871;
    color: #cadbec;
    cursor: pointer;
}
.btn:hover{
    border: 1px solid #cadbec;
}
.profileimg{
    right: 0 !important;
    position: relative !important;
    margin-top: 3% !important;
    max-width: 100px !important;
    max-height: 100px !important;
}
.profilename{
    text-align: left !important;
    margin-top: -24% !important;
    margin-left: 65% !important;
    font-size: 45px !important;
    width: 45vh !important;
    margin: 0 !important;
    position: relative !important;
    top: 25% !important;
    grid-column: 2/4 !important;
}
.redbackground{
    background-color: rgba(255, 0, 0, 0.2);
    height: 5vh;
}
.greenbackground{
    background-color: rgba(0, 255, 0, 0.2);
    height: 5vh;
}
.comptext{
    font-size: 1.5rem;
    margin:auto;
    padding-top:3%;
    padding-bottom: 3%;
}
</style>