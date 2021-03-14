const {Achievements,Profiles,ProfileCompleteds,ProfileStats,Levels} = require('./utils/models');
const {updateProfile} = require('./utils/updateProfile');
const {createProfile} = require('./utils/createProfile');
module.exports = {
    Query:{
        achievements(parent, args, context, info){
            if(args){
                if(args.type && args.name){
                    let data = Achievements.find({type:args.type,name:args.name});
                    return data
                }else if(args.type){
                    let data = Achievements.find({type:args.type});
                    return data
                }else if(args.id){
                    let data = Achievements.find({_id:args.id});
                    return data
                }else{
                    let data = Achievements.find();
                    return data
                }
            }
        },
        profiles(parent, args, context, info){
            if(args){
                if(args.alid){
                    let data = Profiles.find({alid:args.alid});
                    return data
                }else if(args.username){
                    let username = args.username.toLowerCase().charAt(0).toUpperCase()+args.username.slice(1)
                    console.log(username)
                    let data = Profiles.find({username:username});
                    return data
                }else{
                    let data = Profiles.find();
                    return data
                }
            }
        },
        levels(parent, args, context, info){
            if(args){
                if(args.level){
                    let data = Levels.find({level:args.level});
                    return data
                }else{
                    let data = Levels.find();
                    return data
                }
            }
        }
    },
    Mutation:{
        updateProfile: async(_,{
            alid
        })=>{
            updateProfile(alid)
        },
        createProfile: async(_,{
            username,alid
        })=>{
            createProfile(username,alid)
        }
    },
    Profile:{
        async achievements(parent,args, context, info){
            let data = ProfileCompleteds.find({alid:parent.alid});
            return data
        },
        async stats(parent,args, context, info){
            let data = ProfileStats.find({alid:parent.alid});
            return data
        }
    }
}