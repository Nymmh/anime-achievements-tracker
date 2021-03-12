<template>
    <ApolloQuery :query="require('../graphql/allAchievements.gql')">
    <template v-slot="{result:{loading,error,data}}">
        <template v-if="loading"><div><loading/></div></template>
        <template v-else-if="error">Error Loading {{error}}</template>
        <template v-else-if="data">
            <div class="grid-container">
                <div v-for="ach in data.achievements" :key="ach._id" class="grid-spot">
                    <h1 v-text="ach.name"></h1>
                    <p v-text="ach.description"></p>
                    <p v-text="'Tier: '+ach.tier"></p>
                    <p v-text="'Type: '+ach.type"></p>
                    <p v-text="'XP: '+ach.xp"></p>
                    <img v-bind:src="ach.image" alt="" srcset="">
                </div>
            </div>
        </template>
    </template>
    </ApolloQuery>
</template>
<script>
import Loading from './loading.vue'
export default {
    name: "Achievements",
    components:{'loading':Loading},
}
</script>
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1em 1em;
    grid-template-areas:
    ". ."
    ". ."
    ". .";
}
.grid-spot{
    background-color: #807C83;
}
</style>