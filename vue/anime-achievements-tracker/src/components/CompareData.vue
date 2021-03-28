<template>
    <div class="grid">
        <div v-show="this.loadingShow" style="grid-column:1/3;max-width:100%;margin:auto;"><loading/></div>
        <div style="grid-column: 1/3; width:95%;" class="container" id="compatibility" v-show="this.pageuserdata">
            <p class="comptext" style="padding:0;position: relative;top: 30%;" v-text="'Compatibility: ' + this.compatibility+'%'"></p> 
        </div>
            <div class="usercontainer" id="user1" v-show="pageuserdata">
                <div class="usergrid">
                    <a v-bind:href="'https://anilist.co/user/'+this.userdata.user1.name" target="_blank"> 
                        <img v-bind:src="this.userdata.user1.avatar" alt="" class="profileimg">
                    </a>
                    <h1 v-text="this.userdata.user1.name" class="profilename"></h1>
                    <template v-if="this.userdata.user1.anime.meanscore > this.userdata .user2.anime.meanscore"><div class="greenbackground"><p class="comptext" v-text="'Mean Score: '+this.userdata .user1.anime.meanscore"></p></div></template>
                    <template v-if="this.userdata.user1.anime.meanscore < this.userdata .user2.anime.meanscore"><div class="redbackground"><p class="comptext" v-text="'Mean Score: '+this.userdata  .user1.anime.meanscore"></p></div></template>
                    <template v-if="this.userdata.user1.anime.count > this.userdata .user2.anime.count"><div class="greenbackground"><p class="comptext" v-text="'Completed: '+this.userdata .user1.anime.count"></p></div></template>
                    <template v-if="this.userdata.user1.anime.count < this.userdata .user2.anime.count"><div class="redbackground"><p class="comptext" v-text="'Completed: '+this.userdata.user1.anime.count"></p></div></template>
                    <template v-if="this.userdata.user1.anime.planning > this.userdata  .user2.anime.planning"><div class="greenbackground"><p class="comptext" v-text="'Planning: '+this.userdata .user1.anime.planning"></p></div></template>
                    <template v-if="this.userdata.user1.anime.planning < this.userdata  .user2.anime.planning"><div class="redbackground"><p class="comptext" v-text="'Planning: '+this.userdata  .user1.anime.planning"></p></div></template>
                    <template v-if="this.userdata.user1.anime.current > this.userdata.user2.anime.current"><div class="greenbackground"><p class="comptext" v-text="'Watching: '+this.userdata  .user1.anime.current"></p></div></template>
                    <template v-if="this.userdata.user1.anime.current < this.userdata.user2.anime.current"><div class="redbackground"><p class="comptext" v-text="'Watching: '+this.userdata .user1.anime.current"></p></div></template>
                    <template v-if="this.userdata.user1.anime.episodes > this.userdata  .user2.anime.episodes"><div class="greenbackground"><p class="comptext" v-text="'Episodes: '+this.userdata .user1.anime.episodes"></p></div></template>
                    <template v-if="this.userdata.user1.anime.episodes < this.userdata  .user2.anime.episodes"><div class="redbackground"><p class="comptext" v-text="'Episodes: '+this.userdata  .user1.anime.episodes"></p></div></template>
                    <template v-if="this.userdata.user1.anime.minutes > this.userdata.user2.anime.minutes"><div class="greenbackground"><p class="comptext" v-text="'Minutes: '+this.userdata.user1.anime.minutes"></p></div></template>
                    <template v-if="this.userdata.user1.anime.minutes < this.userdata.user2.anime.minutes"><div class="redbackground"><p class="comptext" v-text="'Minutes: '+this.userdata .user1.anime.minutes"></p></div></template>
                    <p class="comptext" style="grid-column: 1/4;">Formats</p>
                    <template v-for="fmt in this.userdata.user1.anime.formats">
                        <template v-for="frt in userdata.user2.anime.formats">
                            <template v-if="fmt.format == frt.format">
                                <template v-if="fmt.count > frt.count"><div class="greenbackground" v-bind:key="'C'+fmt.format + frt.format + fmt.count"><p class="comptext" v-text="fmt.format+': '+fmt.count"></p></div></template>
                                <template v-if="fmt.count < frt.count"><div class="redbackground" v-bind:key="'D'+fmt.format + frt.format + fmt.count"><p class="comptext" v-text="fmt.format+': '+fmt.count"></p></div></template>
                                <template v-if="fmt.meanscore > frt.meanscore"><div class="greenbackground" v-bind:key="'C'+fmt.format + frt.format + fmt.meanscore"><p class="comptext" v-text="'Score: '+fmt.meanscore"></p></div></template>
                                <template v-if="fmt.meanscore < frt.meanscore"><div class="redbackground" v-bind:key="'D'+fmt.format + frt.format + fmt.meanscore"><p class="comptext" v-text="'Score: '+fmt.meanscore"></p></div></template>
                                <template v-if="fmt.minutes > frt.minutes"><div class="greenbackground" v-bind:key="'C'+fmt.format + frt.format + fmt.minutes"><p class="comptext" v-text="'Minutes: '+fmt.minutes"></p></div></template>
                                <template v-if="fmt.minutes < frt.minutes"><div class="redbackground" v-bind:key="'D'+fmt.format + frt.format + fmt.minutes"><p class="comptext" v-text="'Minutes: '+fmt.minutes"></p></div></template>
                            </template>
                        </template>
                    </template>
                    <p class="comptext" style="grid-column: 1/4;">Genres</p>
                    <template v-for="gn in this.userdata.user1.anime.genres">
                        <template v-for="gr in userdata.user2.anime.genres">
                            <template v-if="gn.genre == gr.genre">
                                <template v-if="gn.count > gr.count"><div class="greenbackground" v-bind:key="'E'+gn.genre + gr.genre + gn.count"><p class="comptext" v-text="gn.genre+': '+gn.count"></p></div></template>
                                <template v-if="gn.count < gr.count"><div class="redbackground" v-bind:key="'F'+gn.genre + gr.genre + gn.count"><p class="comptext" v-text="gn.genre+': '+gn.count"></p></div></template>
                                <template v-if="gn.meanscore > gr.meanscore"><div class="greenbackground" v-bind:key="'E'+gn.genre + gr.genre + gn.meanscore"><p class="comptext" v-text="'Score: '+gn.meanscore"></p></div></template>
                                <template v-if="gn.meanscore < gr.meanscore"><div class="redbackground" v-bind:key="'F'+gn.genre + gr.genre + gn.meanscore"><p class="comptext" v-text="'Score: '+gn.meanscore"></p></div></template>
                                <template v-if="gn.minutes > gr.minutes"><div class="greenbackground" v-bind:key="'E'+gn.genre + gr.genre + gn.minutes"><p class="comptext" v-text="'Minutes: '+gn.minutes"></p></div></template>
                                <template v-if="gn.minutes < gr.minutes"><div class="redbackground" v-bind:key="'F'+gn.genre + gr.genre + gn.minutes"><p class="comptext" v-text="'Minutes: '+gn.minutes"></p></div></template>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
            <div class="usercontainer" id="user2" v-show="pageuserdata">
                <div class="usergrid">
                    <a v-bind:href="'https://anilist.co/user/'+this.userdata.user2.name" target="_blank"> 
                        <img v-bind:src="this.userdata.user2.avatar" alt="" class="profileimg">
                    </a>
                    <h1 v-text="this.userdata.user2.name" class="profilename"></h1>
                    <template v-if="this.userdata.user1.anime.meanscore < this.userdata.user2.anime.meanscore"><div class="greenbackground"><p class="comptext" v-text="'Mean Score: '+this.userdata.user2.anime.meanscore"></p></div></template>
                    <template v-if="this.userdata.user1.anime.meanscore > this.userdata.user2.anime.meanscore"><div class="redbackground"><p class="comptext" v-text="'Mean Score: '+this.userdata.user2.anime.meanscore"></p></div></template>
                    <template v-if="this.userdata.user1.anime.count > this.userdata.user2.anime.count"><div class="redbackground"><p class="comptext" v-text="'Completed: '+this.userdata.user2.anime.count"></p></div></template>
                    <template v-if="this.userdata.user1.anime.count < this.userdata.user2.anime.count"><div class="greenbackground"><p class="comptext" v-text="'Completed: '+this.userdata.user2.anime.count"></p></div></template>
                    <template v-if="this.userdata.user1.anime.planning < this.userdata.user2.anime.planning"><div class="greenbackground"><p class="comptext" v-text="'Planning: '+this.userdata.user2.anime.planning"></p></div></template>
                    <template v-if="this.userdata.user1.anime.planning > this.userdata.user2.anime.planning"><div class="redbackground"><p class="comptext" v-text="'Planning: '+this.userdata.user2.anime.planning"></p></div></template>
                    <template v-if="this.userdata.user1.anime.current < this.userdata.user2.anime.current"><div class="greenbackground"><p class="comptext" v-text="'Watching: '+this.userdata.user2.anime.current"></p></div></template>
                    <template v-if="this.userdata.user1.anime.current > this.userdata.user2.anime.current"><div class="redbackground"><p class="comptext" v-text="'Watching: '+this.userdata.user2.anime.current"></p></div></template>
                    <template v-if="this.userdata.user1.anime.episodes < this.userdata.user2.anime.episodes"><div class="greenbackground"><p class="comptext" v-text="'Episodes: '+this.userdata.user2.anime.episodes"></p></div></template>
                    <template v-if="this.userdata.user1.anime.episodes > this.userdata.user2.anime.episodes"><div class="redbackground"><p class="comptext" v-text="'Episodes: '+this.userdata.user2.anime.episodes"></p></div></template>
                    <template v-if="this.userdata.user1.anime.minutes < this.userdata.user2.anime.minutes"><div class="greenbackground"><p class="comptext" v-text="'Minutes: '+this.userdata.user2.anime.minutes"></p></div></template>
                    <template v-if="this.userdata.user1.anime.minutes > this.userdata.user2.anime.minutes"><div class="redbackground"><p class="comptext" v-text="'Minutes: '+this.userdata.user2.anime.minutes"></p></div></template>
                    <p class="comptext" style="grid-column: 1/4;">Formats</p>
                    <template v-for="fmt in this.userdata.user1.anime.formats">
                        <template v-for="frt in userdata.user2.anime.formats">
                            <template v-if="fmt.format == frt.format">
                                <template v-if="fmt.count < frt.count"><div class="greenbackground" v-bind:key="'A'+fmt.format + frt.format + frt.count"><p class="comptext" v-text="frt.format+': '+frt.count"></p></div></template>
                                <template v-if="fmt.count > frt.count"><div class="redbackground" v-bind:key="'B'+fmt.format + frt.format + frt.count"><p class="comptext" v-text="frt.format+': '+frt.count"></p></div></template>
                                <template v-if="fmt.meanscore < frt.meanscore"><div class="greenbackground" v-bind:key="'A'+fmt.format + frt.format + frt.meanScore"><p class="comptext" v-text="'Score: '+frt.meanscore"></p></div></template>
                                <template v-if="fmt.meanscore > frt.meanscore"><div class="redbackground" v-bind:key="'B'+fmt.format + frt.format + frt.meanScore"><p class="comptext" v-text="'Score: '+frt.meanscore"></p></div></template>
                                <template v-if="fmt.minutes < frt.minutes"><div class="greenbackground" v-bind:key="'A'+fmt.format + frt.format + frt.minutes"><p class="comptext" v-text="'Minutes: '+frt.minutes"></p></div></template>
                                <template v-if="fmt.minutes > frt.minutes"><div class="redbackground" v-bind:key="'B'+fmt.format + frt.format + frt.minutes"><p class="comptext" v-text="'Minutes: '+frt.minutes"></p></div></template>
                            </template>
                        </template>
                    </template>
                    <p class="comptext" style="grid-column: 1/4;">Genres</p>
                    <template v-for="gn in this.userdata.user1.anime.genres">
                        <template v-for="gr in userdata.user2.anime.genres">
                            <template v-if="gn.genre == gr.genre">
                                <template v-if="gn.count < gr.count"><div class="greenbackground" v-bind:key="'G'+gn.genre + gr.genre + gr.count"><p class="comptext" v-text="gr.genre+': '+gr.count"></p></div></template>
                                <template v-if="gn.count > gr.count"><div class="redbackground" v-bind:key="'H'+gn.genre + gr.genre + gr.count"><p class="comptext" v-text="gr.genre+': '+gr.count"></p></div></template>
                                <template v-if="gn.meanscore < gr.meanscore"><div class="greenbackground" v-bind:key="'G'+gn.genre + gr.genre + gr.meanscore"><p class="comptext" v-text="'Score: '+gr.meanscore"></p></div></template>
                                <template v-if="gn.meanscore > gr.meanscore"><div class="redbackground" v-bind:key="'H'+gn.genre + gr.genre + gr.meanscore"><p class="comptext" v-text="'Score: '+gr.meanscore"></p></div></template>
                                <template v-if="gn.minutes < gr.minutes"><div class="greenbackground" v-bind:key="'G'+gn.genre + gr.genre + gr.minutes"><p class="comptext" v-text="'Minutes: '+gr.minutes"></p></div></template>
                                <template v-if="gn.minutes > gr.minutes"><div class="redbackground" v-bind:key="'H'+gn.genre + gr.genre + gr.minutes"><p class="comptext" v-text="'Minutes: '+gr.minutes"></p></div></template>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
    </div>
</template>
<script>
import Loading from './loading.vue'
export default {
    name: "CompareData",
    components:{'loading':Loading},
    props:['userdata','loadingShow','pageuserdata','compatibility'],
}
</script>
<style>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr !important;
  gap: 2vh 0px;
  grid-template-areas:
    ". ."
    ". .";
  max-width: 85%;
  margin: 0 auto;
  position: relative;
  top: 7vh;
}
</style>