const {Achievements,ProfileStats,Profiles,Levels} = require('../utils/models');
exports.updateProfilexp = (alid)=>{
    updateProfilexp(alid)
}

function updateProfilexp(alid){
    ProfileStats.findOne({alid:alid},(err,res)=>{
        var tvCount = 0,
            movieCount = 0,
            musicCount = 0,
            ovaCount = 0,
            specialCount = 0,
            tvshortCount = 0,
            onaCount = 0;
        if(res.movieWatched) movieCount = res.movieWatched;
        if(res.musicFormatWatched) musicCount = res.musicFormatWatched;
        if(res.ovaWatched) ovaCount = res.ovaWatched;
        if(res.specialWatched) specialCount = res.specialWatched;
        if(res.tvWatched) tvCount = res.tvWatched;
        if(res.tvshortWatched) tvshortCount = res.tvshortWatched;
        Profiles.findOne({alid:alid},(err,res)=>{
            var xp = res.xp,
                level = res.level,
                stars = res.stars;
            var tvXP = (tvCount*50),
                movieXP = (movieCount*40),
                ovaXP = (ovaCount*30),
                onaXP = (onaCount*30),
                tvshortXP = (tvshortCount*25),
                specialXP = (specialCount*20),
                musicXP = (musicCount*15);
            var totalXP = (tvXP+movieXP+ovaXP+onaXP+tvshortXP+specialXP+musicXP);
            console.log(totalXP)
            if(totalXP>0){
                Levels.findOne({level:50},(err,res)=>{
                    if(totalXP>res.max){
                        let maxXP = res.max;
                        var xp = totalXP,
                            i = 0;
                        for(i;xp>maxXP;i++){
                            xp = (xp-20550);
                        }
                        stars = i;
                        Levels.findOne({max:{$gte:xp}},(err,res)=>{
                            Profiles.findOneAndUpdate({alid:alid},{xp:xp,level:res.level,chuunibyou:stars,updating:false},{new:true},(err,res)=>{

                            });
                        });
                    }else{
                        Levels.findOne({max:{$gte:totalXP}},(err,res)=>{
                            level = res.level;
                            Profiles.findOneAndUpdate({alid:alid},{xp:totalXP,level:level,updating:false},{new:true},(err,res)=>{
    
                            });
                        });
                    }
                });
            }else{
                xp = 0;
                level = 0;
                Profiles.findOneAndUpdate({alid:alid},{xp:xp,level:level,updating:false},{new:true},(err,res)=>{

                });
            }
        });
    });
}