let request = require('request'),
    mongoose = require('mongoose'),
    moment = require('moment');

const {Profiles,ProfileStats,Scores} = require('../utils/models');
const uProAchievements = require('./updateProfileAchievements');
exports.updateProfile = (alid)=>{
    updateProfile(alid)
}
function updateProfile(alid){
    Profiles.find({alid:alid},(err,res)=>{
        if(!err){
            if(!res[0])console.log("no user found have to send to create")
            else{
                let userID = res[0]._id;
                Profiles.findOneAndUpdate({_id:userID},{updating:true},{new:true},(err,data)=>{
                  if(err)console.log(err)
                  else{
                    query = `
                    query($anilistid:Int){
                        User(id:$anilistid){
                          id
                          avatar{
                            large
                          }
                          bannerImage
                          mediaListOptions{
                            scoreFormat
                          }
                          statistics{
                            anime{
                              count
                              meanScore
                              standardDeviation
                              minutesWatched
                              episodesWatched
                              formats {
                                format
                                count
                                meanScore
                                minutesWatched
                              }
                              scores {
                                score
                                count
                              }
                              statuses {
                                status
                                count
                                minutesWatched
                              }
                              lengths {
                                length
                                count
                              }
                              releaseYears {
                                releaseYear
                                count
                              }
                              genres {
                                genre
                                count
                                minutesWatched
                              }
                              tags{
                                tag {
                                  id
                                  name
                                }
                                count
                              }
                              countries{
                                country
                                count
                              }
                              studios{
                                studio {
                                  id
                                  name
                                }
                                count
                              }
                            }
                          }
                          favourites{
                            anime{
                              pageInfo {
                                total
                              }
                            }
                          }
                        }
                      }
                    `;
                    variables = {
                        anilistid: alid
                    }
                    url="https://graphql.anilist.co";
                    options={
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            query:query,
                            variables:variables
                        })
                    };
                    request(url,options,(error,response,body)=>{
                        var ALbody = JSON.parse(body)
                        let lastUpdateTime = moment().unix();
                        let User = ALbody.data.User,
                            AnimeStats = User.statistics.anime,
                            avatar = User.avatar.large,
                            banner = User.bannerImage,
                            totalAnime = AnimeStats.count,
                            meanScore = AnimeStats.meanScore,
                            minutesWatched = AnimeStats.minutesWatched,
                            episodesWatched = AnimeStats.episodesWatched,
                            formatsWatched = AnimeStats.formats,
                            scoreFormat = User.mediaListOptions.scoreFormat,
                            scores = AnimeStats.scores;
                        var comedyCount = 0,
                            actionCount = 0,  
                            dramaCount = 0,
                            romanceCount = 0,
                            sliceOfLifeCount = 0,
                            fantasyCount = 0,
                            supernaturalCount = 0,
                            sciFiCount = 0,
                            adventureCount = 0,
                            mysteryCount = 0,
                            ecchiCount = 0,
                            psychologicalCount = 0,
                            musicCount = 0,
                            thrillerCount = 0,
                            horrorCount = 0,
                            mechaCount = 0,
                            sportsCount = 0,
                            mahouShoujoCount = 0,
                            completedCount = 0,
                            droppedCount = 0,
                            degenerate = 0,
                            movieCount = 0,
                            tvCount = 0,
                            ovaCount = 0,
                            specialCount = 0,
                            tvshortCount = 0,
                            onaCount = 0,
                            musicCount = 0,
                            score1 = 0,
                            score2 = 0,
                            score3 = 0,
                            score4 = 0,
                            score5 = 0,
                            score6 = 0,
                            score7 = 0,
                            score8 = 0,
                            score9 = 0,
                            score10 = 0,
                            score15 = 0,
                            score20 = 0,
                            score25 = 0,
                            score30 = 0,
                            score35 = 0,
                            score40 = 0,
                            score45 = 0,
                            score50 = 0,
                            score55 = 0,
                            score60 = 0,
                            score65 = 0,
                            score70 = 0,
                            score75 = 0,
                            score80 = 0,
                            score85 = 0,
                            score90 = 0,
                            score95 = 0,
                            score100 = 0
                        for(let gen in AnimeStats.genres){
                          if(AnimeStats.genres[gen].genre == "Comedy")comedyCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Action")actionCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Drama")dramaCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Romance")romanceCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Slice of Life")sliceOfLifeCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Fantasy")fantasyCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Supernatural")supernaturalCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Sci-Fi")sciFiCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Adventure")adventureCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Mystery")mysteryCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Ecchi")ecchiCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Psychological")psychologicalCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Music")musicCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Thriller")thrillerCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Horror")horrorCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Mecha")mechaCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Sports")sportsCount = AnimeStats.genres[gen].count;
                          else if(AnimeStats.genres[gen].genre == "Mahou Shoujo")mahouShoujoCount = AnimeStats.genres[gen].count;
                        }
                        for(let sta in AnimeStats.statuses){
                          if(AnimeStats.statuses[sta].status === "COMPLETED")completedCount = AnimeStats.statuses[sta].count;
                          else if(AnimeStats.statuses[sta].status === "DROPPED")droppedCount = AnimeStats.statuses[sta].count;
                        }
                        for(let frm in formatsWatched){
                          if(formatsWatched[frm].format == "MOVIE") movieCount = formatsWatched[frm].count;
                          else if(formatsWatched[frm].format == "TV") tvCount = formatsWatched[frm].count;
                          else if(formatsWatched[frm].format == "OVA") ovaCount = formatsWatched[frm].count;
                          else if(formatsWatched[frm].format == "SPECIAL") specialCount = formatsWatched[frm].count;
                          else if(formatsWatched[frm].format == "TV_SHORT") tvshortCount = formatsWatched[frm].count;
                          else if(formatsWatched[frm].format == "ONA") onaCount = formatsWatched[frm].count;
                          else if(formatsWatched[frm].format == "MUSIC") musicCount = formatsWatched[frm].count;
                        }
                        for(let sc in scores){
                          if(scores[sc].score == 1)score1 = scores[sc].count;
                          else if(scores[sc].score == 2)score2 = scores[sc].count;
                          else if(scores[sc].score == 3)score3 = scores[sc].count;
                          else if(scores[sc].score == 4)score4 = scores[sc].count;
                          else if(scores[sc].score == 5)score5 = scores[sc].count;
                          else if(scores[sc].score == 6)score6 = scores[sc].count;
                          else if(scores[sc].score == 7)score7 = scores[sc].count;
                          else if(scores[sc].score == 8)score8 = scores[sc].count;
                          else if(scores[sc].score == 9)score9 = scores[sc].count;
                          else if(scores[sc].score == 10)score10 = scores[sc].count;
                          else if(scores[sc].score == 15)score15 = scores[sc].count;
                          else if(scores[sc].score == 20)score20 = scores[sc].count;
                          else if(scores[sc].score == 25)score25 = scores[sc].count;
                          else if(scores[sc].score == 30)score30 = scores[sc].count;
                          else if(scores[sc].score == 35)score35 = scores[sc].count;
                          else if(scores[sc].score == 40)score40 = scores[sc].count;
                          else if(scores[sc].score == 45)score45 = scores[sc].count;
                          else if(scores[sc].score == 50)score50 = scores[sc].count;
                          else if(scores[sc].score == 55)score55 = scores[sc].count;
                          else if(scores[sc].score == 60)score60 = scores[sc].count;
                          else if(scores[sc].score == 65)score65 = scores[sc].count;
                          else if(scores[sc].score == 70)score70 = scores[sc].count;
                          else if(scores[sc].score == 75)score75 = scores[sc].count;
                          else if(scores[sc].score == 80)score80 = scores[sc].count;
                          else if(scores[sc].score == 85)score85 = scores[sc].count;
                          else if(scores[sc].score == 90)score90 = scores[sc].count;
                          else if(scores[sc].score == 95)score95 = scores[sc].count;
                          else if(scores[sc].score == 100)score100 = scores[sc].count;
                        }
                        degenerate = ((ecchiCount/completedCount)*100).toFixed(2);
                        Profiles.findOneAndUpdate({_id:userID},{avatar:avatar,
                            banner:banner,
                            lastupdated:lastUpdateTime},{new:true},(err,data)=>{
                            if(err)console.log(err);
                            else{
                              ProfileStats.findOneAndUpdate({alid:alid},{
                                meanScore:meanScore,
                                completed:completedCount,
                                dropped:droppedCount,
                                minutesWatched:minutesWatched,
                                episodesWatched:episodesWatched,
                                magicalGirlWatched:mahouShoujoCount,
                                actionWatched:actionCount,
                                comedyWatched:comedyCount,
                                dramaWatched:dramaCount,
                                romanceWatched:romanceCount,
                                sliceOfLifeWatched:sliceOfLifeCount,
                                fantasyWatched:fantasyCount,
                                supernaturalWatched:supernaturalCount,
                                sciFiWatched:sciFiCount,
                                adventureWatched:adventureCount,
                                mysteryWatched:mysteryCount,
                                ecchiWatched:ecchiCount,
                                psychologicalWatched:psychologicalCount,
                                musicWatched:musicCount,
                                thrillerWatched:thrillerCount,
                                horrorWatched:horrorCount,
                                mechaWatched:mechaCount,
                                sportsWatched:sportsCount,
                                degenerate:degenerate,
                                tvWatched:tvCount,
                                movieWatched:movieCount,
                                ovaWatched:ovaCount,
                                specialWatched:specialCount,
                                tvshortWatched:tvshortCount,
                                onaWatched:onaCount,
                                musicFormatWatched:musicCount
                              },(err,data)=>{
                                if(err)console.log(err)
                                else{
                                  Scores.findOneAndUpdate({alid:alid},{
                                    scoreType:scoreFormat,
                                    score1:score1,
                                    score2:score2,
                                    score3:score3,
                                    score4:score4,
                                    score5:score5,
                                    score6:score6,
                                    score7:score7,
                                    score8:score8,
                                    score9:score9,
                                    score10:score10,
                                    score15:score15,
                                    score20:score20,
                                    score25:score25,
                                    score30:score30,
                                    score35:score35,
                                    score40:score40,
                                    score45:score45,
                                    score50:score50,
                                    score55:score55,
                                    score60:score60,
                                    score65:score65,
                                    score70:score70,
                                    score75:score75,
                                    score80:score80,
                                    score85:score85,
                                    score90:score90,
                                    score95:score95,
                                    score100:score100,
                                  },(err,data)=>{
                                    if(err)console.log(err)
                                    else uProAchievements.updateProfileAchievements(alid,completedCount,droppedCount,mahouShoujoCount,actionCount,adventureCount,sliceOfLifeCount,fantasyCount,ecchiCount,mechaCount,mysteryCount)
                                  })
                                }
                              });
                            }
                        });
                    });
                  }
                })
            }
        }else{
            console.log(err)
        }
    });
}