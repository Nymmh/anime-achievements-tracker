<template>
<div>
    <navbar/>
    <loading style="position:absolute;top:45%;right:47.5%;z-index:1000;" v-if="showloading"/>
    <ApolloQuery :query="require('../graphql/Profile.gql')" :variables="{username:username}">
    <template v-slot="{result:{loading,error,data}}">
        <template v-if="loading"><div><loading/></div></template>
        <template v-else-if="error">Error Loading</template>
        <template v-else-if="data">
            <div>
                <notifications classes="vue_notifications vue_notification_success" group="adding" position="top center" width="400"/>
                <notifications classes="vue_notifications vue_notification_failed" group="failed" position="top center" width="400"/>
                <template v-if="data.profiles[0].banner">
                    <div class="profilebg"><img v-bind:src="data.profiles[0].banner" alt="" style="width:100%;z-index-1;position:relative;background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));" class="bgimage"></div>
                </template>
                <template v-else>
                    <div style="margin-top:15%;"></div>
                </template>
                <div class="profiletop">
                    <div style="float:left;">
                        <a v-bind:href="'https://anilist.co/user/'+data.profiles[0].username" target="_blank"> 
                            <img v-bind:src="data.profiles[0].avatar" alt="" class="profileimg">
                            <h1 v-text="data.profiles[0].username" class="profilename"></h1>
                        </a>
                    </div>
                    <div style="float:right;position:relative;right:15%;margin-top:8.1%;" class="mobileupdate">
                        <div v-on:click="update(alid)" style="position:relative;top: -1px;z-index:1000;cursor: pointer;width:19vh;"><p class="updateButton">Update</p></div>
                        <div style="position:relative;top: -5px;left: 110%;"><p class="lastUpdateText" v-text="'Last Update: '+lastUpdated"></p></div>
                    </div>
                </div>
                <ApolloQuery :query="require('../graphql/getLevel.gql')" :variables="{level:data.profiles[0].level}" style="max-height:100px;position:relative;top:-22vh;" class="mobilelevel">
                <template v-slot="{result:{loading,error,data}}">
                    <template v-if="loading"><div><loading/></div></template>
                    <template v-else-if="error">Error Loading</template>
                    <template v-else-if="data">
                        <div style="margin:0;">
                            <div id="xparea" class="grid-container-xp" style="height:100%;">
                                <p style="font-size: 1.5rem;margin:auto;padding-top:4%;" v-text="'Level: '+level"></p>
                                <template v-if="((xp/data.levels[0].max)*100)>100">
                                    <div style="padding-top:4.5%"><div class="meterxp xp nostripes"><span :style="'width: 100%'"></span></div></div>
                                </template>
                                <template v-else>
                                    <div style="padding-top:4.5%"><div class="meterxp xp nostripes"><span :style="'width: '+ ((xp/data.levels[0].max)*100) +'%'"></span></div><span style="color:#cadbec;" v-text="xp+' xp / '+data.levels[0].max+' xp'"></span></div>
                                </template>
                                <p style="font-size: 1.5rem;margin:auto;padding-top:4%;" v-text="'Chuunibyou: '+chuunibyou"></p>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:4%;" v-text="'Followers: '+followers"></p></div>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:4%;" v-text="'Likes: '+likes"></p></div>
                            </div>
                        </div>
                    </template>
                </template>
                </ApolloQuery>
                <div class="sidebargrid">
                    <div id="animeStats" style="position:relative;top:-12vh;grid-column: 1/1;cursor: pointer;" class="mobileanime" @click="showAnimeStats =! showAnimeStats;showAchievements = false;showCharts = false;showAnimeList = false;showPlanningList=false;">
                        <div class="grid-container-stats">
                            <div style="grid-column: 1 / 4;"><h2 style="font-size: 2rem;margin:auto;padding-top:3%;cursor: pointer;">Anime</h2></div>
                        </div>
                    </div>
                    <div id="achievements" style="position:relative;top:-3.3vh;cursor:pointer;grid-column: 1/1;" @click="showAchievements =! showAchievements;showAnimeStats = false;showCharts = false;showAnimeList = false;showPlanningList=false;" class="mobileachivements">
                        <div class="grid-container-ach">
                            <div style="grid-column: 1 / 4;"><h2 style="font-size: 2rem;margin:auto;padding-top:3%;">Achievements</h2></div>
                        </div>
                    </div>
                    <div id="charts" style="position:relative;top:-2vh;cursor:pointer;grid-column: 1/1;" @click="showCharts =! showCharts;showAchievements = false;showAnimeStats = false;showAnimeList = false;showPlanningList=false;" class="chartsmobile">
                        <div class="grid-container-ach">
                            <div style="grid-column: 1 / 4;"><h2 style="font-size: 2rem;margin:auto;padding-top:3%;">Charts</h2></div>
                        </div>
                    </div>
                    <div id="animelist" style="position:relative;top:-1vh;cursor:pointer;grid-column: 1/1;" @click="showAnimeList =! showAnimeList;showAchievements = false;showAnimeStats = false;showCharts=false;showPlanningList=false;" class="chartsmobile">
                        <div class="grid-container-ach">
                            <div style="grid-column: 1 / 4;"><h2 style="font-size: 2rem;margin:auto;padding-top:3%;">Completed List</h2></div>
                        </div>
                    </div>
                    <div id="planninglist" style="position:relative;top:0vh;cursor:pointer;grid-column: 1/1;" @click="showPlanningList =! showPlanningList;showAchievements = false;showAnimeStats = false;showCharts=false;showAnimeList=false;" class="chartsmobile">
                        <div class="grid-container-ach">
                            <div style="grid-column: 1 / 4;"><h2 style="font-size: 2rem;margin:auto;padding-top:3%;">Planning List</h2></div>
                        </div>
                    </div>
                    <div style="grid-column: 2/2;grid-row:1;">
                        <div id="showAnimeStats" style="position:relative;top:-12vh;margin-bottom:3vh;" class="mobileanime" v-show="showAnimeStats">
                            <div class="grid-container-xp" style="height:100%;width:97.5%;float:right;">
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;" v-text="'Completed: '+data.profiles[0].stats[0].completed" ref="completedNumber"></p></div>
                                <div style="padding-top:4.5%"><div class="meterxp xp nostripes"><span :style="'width: '+ ((data.profiles[0].stats[0].completed/totalAnime)*100) +'%'"></span></div></div>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;" v-text="((data.profiles[0].stats[0].completed/totalAnime)*100).toFixed(2) +'% of all anime completed'"></p></div>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;" v-text="'Minutes Watched: '+data.profiles[0].stats[0].minutesWatched"></p></div>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;" v-text="'Episodes Watched: '+data.profiles[0].stats[0].episodesWatched"></p></div>
                                <div/>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;padding-bottom: 3%;" v-text="'Average Format Score: '+data.profiles[0].stats[0].averageFormatScore"></p></div>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;padding-bottom: 3%;" v-text="'Average Genre Score: '+data.profiles[0].stats[0].averageGenreScore"></p></div>
                                <div><p style="font-size: 1.5rem;margin:auto;padding-top:3%;padding-bottom: 3%;" v-text="'Average Tag Score: '+data.profiles[0].stats[0].averageTagScore"></p></div>
                            </div>
                        </div>
                        <profileAchievements :data="data" :completed="completed" :username="username" v-show="showAchievements" class="mobileachivementsarea"/>
                        <div class="grid-container-charts" v-show="showCharts" style="padding-bottom:3vh;margin-bottom:3vh;">
                            <h2 style="font-size: 2rem;margin:auto;padding-top:1%;">Genres</h2>
                            <genreChart :username="username" :key="genreChartKey" style="grid-column:2/ span 3;padding-top:23px;height:50vh"/>
                            <h2 style="font-size: 2rem;margin:auto;padding-top:1%;">Scores</h2>
                            <scoreChart :username="username" :key="scoreChartKey" style="grid-column:2/ span 3;padding-top:23px;height:50vh"/>
                        </div>
                        <AnimeList :key="AnimeListKey" :username="username" v-show="showAnimeList" class="mobileachivementsarea"/>
                        <PlanningList :key="PlanningListKey" :username="username" v-show="showPlanningList" class="mobileachivementsarea"/>
                    </div>
                </div>
            </div>
        </template>
    </template>
    </ApolloQuery>
    </div>
</template>
<script>
import Loading from './loading.vue'
import ProfileAchievements from './ProfileAchievements.vue'
import SearchBar from './Searchbar.vue'
import axios from 'axios'
import moment from 'moment'
export default {
    name: "Profile",
    components:{'loading':Loading,'profileAchievements':ProfileAchievements,'navbar':SearchBar,genreChart:()=>import('./genreChart'),scoreChart:()=>import('./scoreChart'),AnimeList:()=>import('./AnimeList'),PlanningList:()=>import('./PlanningList')},
    props:['username'],
    data:()=>({
        alid:"",
        completed:0,
        dropped:0,
        xp:0,
        chuunibyou:0,
        level:0,
        followers:0,
        likes:0,
        lastUpdated:"",
        totalAnime:0,
        updating:false,
        showCharts:false,
        showAchievements:false,
        showloading:false,
        showPopularity:false,
        showScores:false,
        showAnimeStats:true,
        showAnimeList:false,
        showPlanningList:false,
        genreChartKey:0,
        scoreChartKey:1,
        AnimeListKey:2,
        PlanningListKey:3,
    }),
    mounted(){
        this.updateData();
    },
    updated(){
        this.updateData();
    },
    methods:{
        update: function (alid){
            axios({
                url:"https://anime-achievements-tracker.herokuapp.com/graphql",
                method:'post',
                data:{
                    query:
                        `mutation updateProfile($alid:Int!){
                            updateProfile(alid:$alid){
                                username
                            }
                        }`,
                    variables:{
                        alid:alid
                    }
                },
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(updateRes=>{
                if(updateRes.statusText == "OK"){
                    this.showloading = true;
                    this.$notify({
                        group: 'adding',
                        text: `We are now updating that profile based on the data provided by AniList. The page will auto reload once its ready!`,
                        max:2
                    });
                    this.checkUpdate(alid);
                }else{
                    this.$notify({
                        group: 'failed',
                        text: `Looks like AniList hit an error trying to find that profile`,
                        max:2
                    });
                }
            }).then(()=>{
                console.log("done updating")
            })
        },
        updateData: function(){
            axios({
            url:"https://anime-achievements-tracker.herokuapp.com/graphql",
            method:'post',
            data:{
                query:
                    `query getCompleted($username:String){
                        profiles(username:$username){
                            alid
                            xp
                            chuunibyou
                            level
                            lastupdated
                            updating
                            stats{
                                completed
                                followers
                                likes
                            }
                        }
                    }`,
                variables:{
                    username:this.username
                }
            },
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            this.alid = result.data.data.profiles[0].alid;
            this.completed = result.data.data.profiles[0].stats[0].completed;
            this.xp = result.data.data.profiles[0].xp;
            this.followers = result.data.data.profiles[0].stats[0].followers;
            this.likes = result.data.data.profiles[0].stats[0].likes;
            this.chuunibyou = result.data.data.profiles[0].chuunibyou;
            this.level = result.data.data.profiles[0].level;
            this.lastUpdated = moment.unix(Number(result.data.data.profiles[0].lastupdated)).fromNow();
            this.updating = result.data.data.profiles[0].updating;
            if(this.updating){
                this.$notify({
                    group: 'adding',
                    text: `This profile is currently being updated!`,
                    max:2
                });
                this.showloading = true;
                this.checkUpdate(result.data.data.profiles[0].alid);
            }
            this.getGlobalStats();
        })
        },
        getGlobalStats:function(){
            axios({
                url:"https://anime-achievements-tracker.herokuapp.com/graphql",
                method:'post',
                data:{
                    query:
                        `query{
                            globalstats{
                                name
                                count
                            }
                        }`,
                },
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(globalstats=>{
                this.totalAnime = globalstats.data.data.globalstats[0].count;
                this.genreChartKey += 1;
                this.scoreChartKey += 1;
                this.AnimeListKey += 1;
                this.PlanningListKey +=1;
            })
        },
        checkUpdate: function(alid){
            setTimeout(()=>{
                axios({
                    url:"https://anime-achievements-tracker.herokuapp.com/graphql",
                    method:'post',
                    data:{
                        query:
                            `query getCompleted($alid:Int){
                                profiles(alid:$alid){
                                    updating
                                }
                            }`,
                        variables:{
                            alid:alid
                        }
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(result=>{
                    if(!result.data.data.profiles[0].updating)this.$router.go()
                    else this.checkUpdate(alid);
                })
            },1500);
        }
    }
}
</script>
<style scoped>
body{
    margin-bottom: 10vh;
}
</style>
<style>
*{
    font-family: Arial, Helvetica, sans-serif;
}
a{
    text-decoration: none;
    color: #cadbec;
    font-style: normal;
}
.profiletop{
    position: relative;
    top: -19vh;
    padding-left: 19%;
    max-width: 85%;
    height: 23vh;
}
.profilebg{
    max-width: 100%;
    width: 100%;
    height: 38vh;
    overflow: hidden;
}
.profilebg::after{
    display: block;
    position: relative;
    background-image: linear-gradient(transparent, #2c3e50);
    margin-top: -150px;
    height: 150px;
    width: 100%;
    content: '';
    opacity: .7;
}
.updateButton{
    background-color: #3e5871;
    color: #cadbec;
    border-radius: 5px;
    font-size: 30px;
    padding-top: 5%;
    padding-bottom: 5%;
}
.lastUpdateText{
    margin-top: -24%;
    position: relative;
}
.profilearea{
    background-color: rgba(120, 116, 116, 0.5);
    width: 85%;
    margin: 0 auto;
    margin-top: 0%;
    position: relative;
}
.profileimg{
    position: relative;
    right: 43%;
    margin-top: -5.5%;
    max-width: 225px;
    max-height: 225px;
}
.profilename{
    text-align: center;
    margin-top: -24%;
    margin-left: 65%;
    font-size: 45px;
    width: 45vh;
    margin: 0;
    top: -6vh;
    position: relative;
}
.animeStats{
    width: 85%;
    margin: 0 auto;
    background-color: #334661;
    height: 70px;
    border-radius: 5px;
}
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1em 1em;
    grid-template-areas:
    ". ."
    ". ."
    ". .";
}
.grid-container-ach{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1em 1em;
    grid-template-areas: ". ." ". ." ". .";
    width: 100%;
    margin: 0 auto;
    background-color: #334661;
    height: 70px;
    border-radius: 5px;
}
.grid-container-charts{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1em 1em;
    grid-template-areas: ". ." ". ." ". .";
    width: 97.5%;
    float: right;
    margin: 0 auto;
    background-color: #334661;
    border-radius: 5px;
    position: relative;
    top: -12vh;
    height: 100%;
    min-height: 105vh;
    max-height: 150vh;
}
.grid-container-achievement {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1em 1em;
    grid-template-areas:
    ". ."
    ". ."
    ". .";
}
.grid-container-xp {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1em 1em;
    grid-template-areas: ". ." ". ." ". .";
    width: 85%;
    margin: 0 auto;
    background-color: #334661;
    height: 70px;
    border-radius: 5px;
}
.grid-container-stats{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1em 1em;
    grid-template-areas:
    ". ."
    ". ."
    ". .";
    width: 100%;
    margin: 0 auto;
    background-color: #334661;
    height: 70px;
    border-radius: 5px;
}
.sidebargrid{
    display: grid;
    grid-template-columns: minmax(0,1fr)70%;
    grid-template-rows: minmax(0,1fr)70px;
    gap: 1em 0em;
    grid-template-areas:
    ". ."
    ". ."
    ". .";
    width: 85%;
    margin: 0 auto;
    height: 70px;
    border-radius: 5px;
    min-width: 0;
    max-height: 0;
}
.meter {
    box-sizing: content-box;
    height: 20px; /* Can be anything */
    position: relative;
    background: #555;
    border-radius: 0px;
    padding: 10px;
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
}
.meterxp{
    box-sizing: content-box;
    height: 20px;
    position: relative;
    background: transparent;
    border-radius: 0px;
    padding: 0;
    border: 1px solid black;
}
.meter > span {
    display: block;
    height: 100%;
    /* border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px; */
    background-color: rgb(43, 194, 83);
    background-image: linear-gradient(
        center bottom,
        rgb(43, 194, 83) 37%,
        rgb(84, 240, 84) 69%
    );
    box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
        inset 0 -2px 6px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
}
.meterxp > span {
    display: block;
    height: 100%;
    /* border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px; */
    position: relative;
    overflow: hidden;
}
.meter > span:after,
.green > span {
    background-image: linear-gradient(#52eb7d, #40cf68);
}
.red > span {
    background-image: linear-gradient(#ed4e39, #d93c27);
}
.xp > span {
    background-image: linear-gradient(#cadbec, #cadbec);
}
@media only screen and (max-width: 1024px){
p{
    font-size: 15px !important;
}
.profileimg{
    max-width:100px;
}
.profilename{
    font-size: 30px;
}
.profiletop{
    top: -24vh;
}
.mobileupdate{
    right: 65% !important;
    margin-top: -6% !important
}
.updateButton{
    font-size: 15px;
}
.lastUpdateText{
    font-size: 12px;
}
.mobilelevel{
    top: -36vh !important;
}
.grid-container-xp{
    height: 45px;
}
.mobileanime{
    top: -35vh !important;
}
.mobileachivements{
    top: -34vh !important;
}
.grid-container-ach{
    height: 43px;
}
.chartsmobile{
    top: -33vh !important;
}
.mobileachivementsarea{
    top: -33vh !important;
}
.grid-container-achievements{
grid-template-columns:1fr 1fr !important;
}
.achImage{
width:150px;
}
.grid-container-charts{
top: -32vh !important;
height: 50vh; 
}
}
@media only screen and (max-width: 768px){
p{
    font-size: 15px !important;
}
.profileimg{
    max-width:100px;
}
.profilename{
    font-size: 30px;
}
.profiletop{
    top: -24vh;
}
.mobileupdate{
    right: 65% !important;
    margin-top: -10% !important
}
.updateButton{
    font-size: 15px;
}
.lastUpdateText{
    font-size: 12px;
}
.mobilelevel{
    top: -36vh !important;
}
.grid-container-xp{
    height: 32px;
}
.mobileanime{
    top: -35vh !important;
}
.mobileachivements{
    top: -34vh !important;
}
.grid-container-ach{
    height: 43px;
}
.chartsmobile{
    top: -33vh !important;
}
.mobileachivementsarea{
    top: -33vh !important;
}
.grid-container-achievements{
grid-template-columns:1fr 1fr !important;
}
.achImage{
width:150px;
}
.grid-container-charts{
top: -32vh !important;
height: 50vh; 
}
}
@media only screen and (max-width: 415px){
p{
    font-size: 15px !important;
}
.profileimg{
    max-width:100px;
}
.profilename{
    font-size: 30px;
}
.profiletop{
    top: -24vh;
}
.mobileupdate{
    right: 58% !important;
    margin-top: -20% !important
}
.updateButton{
    font-size: 15px;
}
.lastUpdateText{
    font-size: 12px;
}
.mobilelevel{
    top: -29vh !important;
}
.grid-container-xp{
    height: 32px;
}
.mobileanime{
    top: -28vh !important;
}
.mobileachivements{
    top: -27vh !important;
}
.grid-container-ach{
    height: 43px;
}
.chartsmobile{
    top: -26vh !important;
}
.mobileachivementsarea{
    top: -26vh !important;
}
.grid-container-achievements{
grid-template-columns:1fr !important;
}
.achImage{
width:150px;
}
.grid-container-charts{
top: -25vh !important;
height: 80vh; 
}
}
</style>