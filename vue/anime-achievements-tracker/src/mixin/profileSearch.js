import axios from 'axios'
export const profileSearch = {
    data(){
        return{
            username:""
        }
    },
    methods:{
        onSubmit (){
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
                        username:this.username
                    }
                },
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(result=>{
                if(result.data.data.profiles.length == 1){
                    //found profile
                    this.$router.push({name:'Profile',params:{username:this.username.toLowerCase().charAt(0).toUpperCase()+this.username.slice(1)}});
                    document.getElementsByName('username')[0].value = "";
                }else if(result.data.data.profiles.length == 0){
                    //no profile found
                    axios({
                        url:"https://graphql.anilist.co",
                        method:'post',
                        data:{
                            query:
                            `
                            query getProfile($username:String){
                                User(name:$username){
                                    id
                                }
                            }
                            `,
                            variables:{
                                username:this.username
                            }
                        },
                        headers:{
                            'Content-Type':'application/json'
                        }
                    }).then(result=>{
                        if(result.data.data.User.id){
                            this.$notify({
                                group: 'adding',
                                text: `We are now creating that profile based on the data provided by AniList. The page will auto reload once its ready!`,
                                max:2
                            });
                            axios({
                                url:"https://anime-achievements-tracker.herokuapp.com/graphql",
                                method:'post',
                                data:{
                                    query:
                                    `
                                    mutation createProfile($username:String!,$alid:Int!){
                                        createProfile(username:$username alid:$alid){
                                            username
                                        }
                                    }
                                    `,
                                    variables:{
                                        username:this.username,
                                        alid:result.data.data.User.id
                                    }
                                },
                                headers:{
                                    'Content-Type':'application/json'
                                }
                            }).then(()=>{
                                setTimeout(()=>this.$router.push({name:'Profile',params:{username:this.username}}),5000)
                            })
                        }else{
                            this.$notify({
                                group: 'failed',
                                text: `Looks like AniList hit an error trying to find that profile`,
                                max:2
                            });
                        }
                    }).catch(e=>{
                        if(e.response){
                            if(e.response.data.data.User){
                                this.$notify({
                                    group: 'failed',
                                    text: `Looks like AniList couldn't find that profile`,
                                    max:2
                                });
                            }else{
                                this.$notify({
                                    group: 'failed',
                                    text: `Looks like AniList hit an error trying to find that profile`,
                                    max:2
                                });
                            }
                        }else if(e.request){
                            this.$notify({
                                group: 'failed',
                                text: `Looks like we hit an error trying query AniList`,
                                max:2
                            });
                        }else{
                            this.$notify({
                                group: 'failed',
                                text: `Looks like we hit an unexpected error`,
                                max:2
                            });
                        }
                    })
                }else{
                    this.$notify({
                        group: 'failed',
                        text: `Looks like we hit an error trying to search for that profile`,
                        max:2
                    });
                }
            })
        }
    }
}