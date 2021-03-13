<template>
    <div style="position:relative;top:-13vh;"><div v-for="ach in data.profiles[0].achievements" :key="ach._id" class="grid-container-achievements">
        <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.passedtier}">
            <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>                        
                        <div class="meterxp xp nostripes">
                            <template v-if="completed>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(completed/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()).replace(/(_)/g,' ') +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="completed+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="completed+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
            </template>
        </ApolloQuery>
        <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.droppedtier}">
            <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="dropped == 0 || dropped == null"><span style="width: 100%"></span></template>
                            <template v-else-if="dropped>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(dropped/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()).replace(/(_)/g,' ') +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="dropped+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="dropped+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
            </template>
        </ApolloQuery>
        <template v-if="ach.actiontier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.actiontier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="action>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(action/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()).replace(/(_)/g,' ') +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="action+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="action+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.adventuretier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.adventuretier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="adventure>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(adventure/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="adventure+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="adventure+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.comedytier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.comedytier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                        <div class="meterxp xp nostripes">
                            <template v-if="comedy>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(comedy/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="comedy+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="comedy+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.dramatier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.dramatier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="drama>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(drama/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="drama+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="drama+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.ecchitier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.ecchitier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="ecchi>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(ecchi/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="ecchi+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="ecchi+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.fantasytier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.fantasytier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="fantasy>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(fantasy/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="fantasy+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="fantasy+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.horrortier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.horrortier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="horror>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(horror/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="horror+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="horror+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.magicalgirltier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.magicalgirltier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="magicalGirl>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(magicalGirl/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="magicalGirl+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="magicalGirl+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.mechatier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.mechatier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="mecha>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(mecha/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="mecha+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="mecha+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.musictier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.musictier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="music>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(music/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="music+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="music+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.mysterytier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.mysterytier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="mystery>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(mystery/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="mystery+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="mystery+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.psychologicaltier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.psychologicaltier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="psychological>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(psychological/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="psychological+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="psychological+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.romancetier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.romancetier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="romance>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(romance/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="romance+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="romance+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.sciFitier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.sciFitier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="sciFi>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(sciFi/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="sciFi+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="sciFi+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.sliceOfLifetier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.sliceOfLifetier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="sliceOfLife>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(sliceOfLife/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()).replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,letter=>letter.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="sliceOfLife+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="sliceOfLife+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.sportstier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.sportstier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="sports>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(sports/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="sports+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="sports+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.supernaturaltier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.supernaturaltier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="supernatural>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(supernatural/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>lt.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="supernatural+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="supernatural+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
        <template v-if="ach.thrillertier">
            <ApolloQuery :query="require('../graphql/singleAchievement.gql')" :variables="{id:ach.thrillertier}">
                <template v-slot="{result:{loading,error,data}}">
                <template v-if="loading"><div><loading/></div></template>
                <template v-else-if="error">Error Loading</template>
                <template v-else-if="data">
                    <div class="achievement">
                        <img class="achImage" v-bind:src="data.achievements[0].image" alt="">
                        <p id="description" v-text="data.achievements[0].description"></p>
                        <div class="meterxp xp nostripes">
                            <template v-if="thriller>data.achievements[0].max"><span style="width: 100%"></span></template>
                            <template v-else><span :style="'width: '+(thriller/data.achievements[0].max)*100+'%'"></span></template>
                        </div>
                        <div id="achinfo">
                            <p v-text="data.achievements[0].type.replace(/(_)/g,' ').replace(/(_)/g,' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g,lt=>ly.toUpperCase()) +' - '+'Tier: '+data.achievements[0].tier"></p>
                            <template v-if="data.achievements[0].max == null">
                                <p v-text="thriller+' - Max Level'"></p>
                            </template>
                            <template v-else>
                                <p v-text="thriller+' / '+data.achievements[0].max"></p>
                            </template>
                        </div>
                        <h2 id="name" v-text="data.achievements[0].name"></h2>
                    </div>
                </template>
                </template>
            </ApolloQuery>
        </template>
    </div></div>
</template>
<script>
import Loading from './loading.vue'
import axios from 'axios'
export default {
    name:"ProfileAchievements",
    components:{'loading':Loading},
    props:['data','completed','username'],
    data(){
        return{
            dropped:0,
            magicalGirl:0,
            action:0,
            comedy:0,
            drama:0,
            romance:0,
            sliceOfLife:0,
            fantasy:0,
            supernatural:0,
            sciFi:0,
            adventure:0,
            mystery:0,
            ecchi:0,
            psychological:0,
            music:0,
            thriller:0,
            horror:0,
            mecha:0,
            sports:0
        }
    },
    mounted(){
        axios({
            url:"https://anime-achievements-tracker.herokuapp.com/graphql",
            method:'post',
            data:{
                query:
                    `query getCompleted($username:String){
                        profiles(username:$username){
                            stats{
                            dropped
                            magicalGirlWatched
                            actionWatched
                            comedyWatched
                            dramaWatched
                            romanceWatched
                            sliceOfLifeWatched
                            fantasyWatched
                            supernaturalWatched
                            sciFiWatched
                            adventureWatched
                            mysteryWatched
                            ecchiWatched
                            psychologicalWatched
                            musicWatched
                            thrillerWatched
                            horrorWatched
                            mechaWatched
                            sportsWatched
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
            this.dropped = result.data.data.profiles[0].stats[0].dropped;
            this.magicalGirl = result.data.data.profiles[0].stats[0].magicalGirlWatched;
            this.action = result.data.data.profiles[0].stats[0].actionWatched;
            this.comedy = result.data.data.profiles[0].stats[0].comedyWatched;
            this.drama = result.data.data.profiles[0].stats[0].dramaWatched;
            this.romance = result.data.data.profiles[0].stats[0].romanceWatched;
            this.sliceOfLife = result.data.data.profiles[0].stats[0].sliceOfLifeWatched;
            this.fantasy = result.data.data.profiles[0].stats[0].fantasyWatched;
            this.supernatural = result.data.data.profiles[0].stats[0].supernaturalWatched;
            this.sciFi = result.data.data.profiles[0].stats[0].sciFiWatched;
            this.adventure = result.data.data.profiles[0].stats[0].adventureWatched;
            this.mystery = result.data.data.profiles[0].stats[0].mysteryWatched;
            this.ecchi = result.data.data.profiles[0].stats[0].ecchiWatched;
            this.psychological = result.data.data.profiles[0].stats[0].psychologicalWatched;
            this.music = result.data.data.profiles[0].stats[0].musicWatched;
            this.thriller = result.data.data.profiles[0].stats[0].thrillerWatched;
            this.horror = result.data.data.profiles[0].stats[0].horrorWatched;
            this.mecha = result.data.data.profiles[0].stats[0].mechaWatched;
            this.sports = result.data.data.profiles[0].stats[0].sportsWatched;
        })
    }
}
</script>
<style lang="css" scoped>
.grid-container-achievements{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 5em 1.15em;
    width: 85%;
    margin: 0 auto;
    background-color: #334661;
    border-radius: 5px;
    padding: 1%;
}
.achievement{
    background-color: #2c3e50;
    border-radius: 5px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 1em 0em;
    padding-bottom: 1em;
}
.achImage{
    float: left;
    border-radius: 5px 0px 0px 0px;
}
.achImage:hover + #description{
    display: block;
}
.achImage:hover + #description{
    display: block;
}
.achImage:hover ~ #name{
    display: none;
}
#description{
    display: none;
}
.meterxp{
    box-sizing: content-box;
    height: 20px;
    position: relative;
    background: transparent;
    border-radius: 25px;
    padding: 0;
    border: 1px solid black;
    grid-column: 1 / 3;
}
.meterxp > span {
    display: block;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    position: relative;
    overflow: inherit;
}
.meterxp:hover ~ #name{
    display: none;
}
.meterxp:hover ~ #achinfo{
    display: block;
    grid-row-start: 1;
    grid-column: 2;
}
#name{
    display: block;
    grid-row-start: 1;
    grid-column: 2;
}
#achinfo{
    display: none;
    grid-row-start: 1;
    grid-column: 2;
}
</style>