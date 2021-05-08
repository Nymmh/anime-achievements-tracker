let axios = require('axios');
const { ProfileStats } = require('../utils/models');
const updateStats = require('./updateProfilexp');
exports.updatePopularity = (alid)=>{
    updatePopularity(alid,1,0)
}

function updatePopularity(alid,pagenum,likecount){
    axios({
        url:"https://graphql.anilist.co",
        method:'post',
        data:{
            query:
                `fragment ListActivity on ListActivity{
                    likeCount
                    likes{
                      id
                    }
                    type
                  }
                  fragment TextActivity on TextActivity{
                    likeCount
                    likes{
                      id
                    }
                    type
                  }
                  fragment MessageActivity on MessageActivity{
                    likeCount
                    likes{
                      id
                    }
                    type
                  }
                  query($userId:Int $pagenum:Int){
                    Page(page:$pagenum){
                      pageInfo{
                        lastPage
                        total
                        perPage
                        hasNextPage
                        currentPage
                      }
                      activities(userId:$userId){
                        ...MessageActivity
                        ...ListActivity
                        ...TextActivity
                      }
                    }
                  }`,
            variables:{
                userId:alid,
                pagenum:pagenum
            }
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        let hasNextPage = false;
        let Page = result.data.data.Page
        hasNextPage = Page.pageInfo.hasNextPage;
        if(Page.activities[0]){
            for(let pa in Page.activities){
                if(Page.activities[pa].likeCount>0){
                    likecount += Page.activities[pa].likeCount;
                    for(let lk in Page.activities[pa].likes)if(Page.activities[pa].likes[lk].id == alid)(likecount-1)
                }
            }
        } 
        if(hasNextPage){
            pagenum++
            if(Number(result.headers["x-ratelimit-remaining"])<20){
                setTimeout(()=>{
                    updatePopularity(alid,pagenum,likecount)
                },50000);
            }else updatePopularity(alid,pagenum,likecount)
        }else getThreadLikes(alid,1,likecount);
    });
}

function getThreadLikes(alid,pagenum,likecount){
    axios({
        url:"https://graphql.anilist.co",
        method:'post',
        data:{
            query:
                `fragment Thread on Thread{
                    likeCount
                    likes{
                      id
                    }
                  }
                  query($userId:Int $pagenum:Int){
                    Page(page:$pagenum){
                      pageInfo{
                        lastPage
                        total
                        perPage
                        hasNextPage
                        currentPage
                      }
                      threads(userId:$userId){
                        ...Thread
                      }
                    }
                  }`,
            variables:{
                userId:alid,
                pagenum:pagenum
            }
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        let hasNextPage = false;
        let Page = result.data.data.Page
        hasNextPage = Page.pageInfo.hasNextPage;
        if(Page.threads[0]){
            for(let ta in Page.threads){
                likecount += Page.threads[ta].likeCount;
                for(let tk in Page.threads[ta].likes)if(Page.threads[ta].likes[tk].id == alid)(likecount-1)
            }
        }
        if(hasNextPage){
            pagenum++
            if(Number(result.headers["x-ratelimit-remaining"])<20){
                setTimeout(()=>{
                    getThreadLikes(alid,pagenum,likecount)
                },50000);
            }else getThreadLikes(alid,pagenum,likecount)
        }else getThreadComments(alid,1,likecount)
    });
}

function getThreadComments(alid,pagenum,likecount){
    axios({
        url:"https://graphql.anilist.co",
        method:'post',
        data:{
            query:
                `fragment ThreadComment on ThreadComment{
                    likeCount
                    likes{
                      id
                    }
                  }
                  query($userId:Int $pagenum:Int){
                    Page(page:$pagenum){
                      pageInfo{
                        lastPage
                        total
                        perPage
                        hasNextPage
                        currentPage
                      }
                      threadComments(userId:$userId){
                        ...ThreadComment
                      }
                    }
                  }`,
            variables:{
                userId:alid,
                pagenum:pagenum
            }
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        let hasNextPage = false;
        let Page = result.data.data.Page
        hasNextPage = Page.pageInfo.hasNextPage;
        if(Page.threadComments[0]){
            for(let ta in Page.threadComments){
                likecount += Page.threadComments[ta].likeCount;
                for(let tk in Page.threadComments[ta].likes)if(Page.threadComments[ta].likes[tk].id == alid)(likecount-1)
            }
        }
        if(hasNextPage){
            pagenum++
            if(Number(result.headers["x-ratelimit-remaining"])<20){
                setTimeout(()=>{
                    getThreadComments(alid,pagenum,likecount)
                },50000);
            }else getThreadComments(alid,pagenum,likecount)
        }else getFollowers(alid,likecount)
    });
}

function getFollowers(alid,likecount){
    axios({
        url:"https://graphql.anilist.co",
        method:'post',
        data:{
            query:
                `query($userId:Int!){
                    Page(page:1){
                      pageInfo{
                        total
                      }
                      followers(userId:$userId){
                        id
                        name
                      }
                    }
                  }`,
            variables:{
                userId:alid
            }
        },
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        let followers = 0;
        followers = result.data.data.Page.pageInfo.total;
        ProfileStats.findOneAndUpdate({alid:alid},{
            likes:likecount,
            followers:followers
        },(err,data)=>{
            if(err)console.log(err)
            else updateStats.updateProfilexp(alid);
        })
    });
}