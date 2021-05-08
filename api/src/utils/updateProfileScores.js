const updateStats = require('./updateProfilexp');
const { ProfileStats } = require('../utils/models');
let axios = require('axios');

exports.updateProfileScores = (alid)=>{
    updateProfileScores(alid)
}

function updateProfileScores(alid){
    axios({
        url:"https://graphql.anilist.co",
        method:'post',
        data:{
            query:
                `query($alid:Int){
                    User(id:$alid){
                      statistics{
                        anime{
                          formats{
                            meanScore
                          }
                          genres{
                            meanScore
                          }
                          tags{
                            meanScore
                          }
                        }
                      }
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
        let statistics = result.data.data.User.statistics.anime;
        let formatScore = 0,
            genreScore = 0,
            tagScore = 0;
        for(let fs in statistics.formats)formatScore = (formatScore+statistics.formats[fs].meanScore);
        formatScore = (formatScore/statistics.formats.length).toFixed(2);
        for(let gs in statistics.genres)genreScore = (genreScore+statistics.genres[gs].meanScore);
        genreScore = (genreScore/statistics.genres.length).toFixed(2);
        for(let ts in statistics.tags)tagScore = (tagScore+statistics.tags[ts].meanScore);
        tagScore = (tagScore/statistics.tags.length).toFixed(2);
        ProfileStats.findOneAndUpdate({alid:alid},{
            averageFormatScore:formatScore,
            averageGenreScore:genreScore,
            averageTagScore:tagScore
        },(err,data)=>{
            if(err)console.log(err)
            else updateStats.updateProfilexp(alid);
        })
    });
}