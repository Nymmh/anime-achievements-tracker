const {Profiles,ProfileCompleteds,ProfileStats,Scores} = require('../utils/models');
const updateProfile = require('./updateProfile');
exports.createProfile = (username,alid)=>{
    createProfile(username,alid)
}
function createProfile(username,alid){
    Profiles.find({username:{$regex:username, $options: 'i'}},(err,res)=>{
        if(!err){
            if(!res[0]){
                console.log('No profile, creating')
                var newProfile = new Profiles({alid:alid,username:username,xp:0,level:0,chuunibyou:0,updating:true}),
                    newProfileCompleted = new ProfileCompleteds({alid:alid}),
                    newProfileStats = new ProfileStats({alid:alid}),
                    newScores = new Scores({alid:alid});
                newProfile.save().then(res=>{
                    console.log(res)
                    newProfileCompleted.save().then(res=>{
                        console.log(res)
                        //send to update
                        newProfileStats.save().then(res=>{
                            console.log(res);
                            newScores.save().then(res=>{
                                console.log(res);
                                updateProfile.updateProfile(alid)
                            });
                        });
                    })
                })
            }else{
                console.log('We found a profile send to update')
                let alid = res[0].alid;
                updateProfile.updateProfile(alid)
            }
        }
    });
}