<template>
    <header>
      <nav>
        <div class="search">
            <div><router-link :to="{name:'Compare'}" style="line-height: 100%;vertical-align: middle;"><span style="vertical-align: middle;">Compare</span></router-link></div>
            <form action="" v-on:submit.prevent="onSubmit" style="margin:auto;">
                <input type="search" name="username" v-model="username" placeholder="AniList Username" class="searchtext">
                <input type="submit" value="Search" class="btn">
            </form>
        </div>
      </nav>
        <notifications classes="vue_notifications vue_notification_failed" group="failedSearch" position="top center" width="400"/>
        <notifications classes="vue_notifications vue_notification_success" group="addingSearch" position="top center" width="400"/>
    </header>
</template>
<script>
import {profileSearch} from '../mixin/profileSearch.js'
export default {
  name: 'Searchbar',
  components: {},
  mixins:[profileSearch],
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