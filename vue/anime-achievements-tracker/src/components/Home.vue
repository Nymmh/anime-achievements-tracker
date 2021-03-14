<template>
    <div>
        <div>
            <notifications classes="vue_notifications vue_notification_failed" group="failed" position="top center" width="400"/>
            <notifications classes="vue_notifications vue_notification_success" group="adding" position="top center" width="400"/>
            <form action="" v-on:submit.prevent="onSubmit">
                <h1>Anime Achievements Tracker for AniList</h1>
                <input type="search" name="username" v-model="username" placeholder="AniList Username">
            </form>
        </div>
    </div>
</template>
<script>
//import Loading from './loading.vue'
import {profileSearch} from '../mixin/profileSearch.js'
export default {
    name: "Home",
    //components:{'loading':Loading},
    components:{},
    mixins:[profileSearch],
}
</script>
<style scoped>

</style>