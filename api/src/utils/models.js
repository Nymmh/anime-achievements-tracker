const mongoose = require('mongoose');

module.exports.Achievements = mongoose.model("achievements",{
    name:String,
    description:String,
    max:Number,
    min:Number,
    image:String,
    type:String,
    tier:Number,
    xp:Number
});

module.exports.Profiles = mongoose.model("profiles",{
    alid:Number,
    username:String,
    avatar:String,
    banner:String,
    lastupdated:String,
    xp:Number,
    level:Number,
    chuunibyou:Number,
    updating:Boolean
});

module.exports.ProfileStats = mongoose.model("profilestats",{
    alid:Number,
    completed:Number,
    dropped:Number,
    meanScore:String,
    minutesWatched:Number,
    episodesWatched:Number,
    magicalGirlWatched:Number,
    actionWatched:Number,
    comedyWatched:Number,
    dramaWatched:Number,
    romanceWatched:Number,
    sliceOfLifeWatched:Number,
    fantasyWatched:Number,
    supernaturalWatched:Number,
    sciFiWatched:Number,
    adventureWatched:Number,
    mysteryWatched:Number,
    ecchiWatched:Number,
    psychologicalWatched:Number,
    musicWatched:Number,
    thrillerWatched:Number,
    horrorWatched:Number,
    mechaWatched:Number,
    sportsWatched:Number,
    degenerate:String,
    tvWatched:Number,
    movieWatched:Number,
    ovaWatched:Number,
    specialWatched:Number,
    tvshortWatched:Number,
    onaWatched:Number,
    musicFormatWatched:Number,
    followers:Number,
    likes:Number,
    averageFormatScore:String,
    averageGenreScore:String,
    averageTagScore:String
});

module.exports.ProfileCompleteds = mongoose.model("profilecompleteds",{
    alid:Number,
    passedtier:String,
    droppedtier:String,
    magicalgirltier:String,
    actiontier:String,
    comedytier:String,
    dramatier:String,
    romancetier:String,
    sliceOfLifetier:String,
    fantasytier:String,
    supernaturaltier:String,
    sciFitier:String,
    adventuretier:String,
    mysterytier:String,
    ecchitier:String,
    psychologicaltier:String,
    musictier:String,
    thrillertier:String,
    horrortier:String,
    mechatier:String,
    sportstier:String,
});

module.exports.Levels = mongoose.model("levels",{
    level:Number,
    min:Number,
    max:Number
});

module.exports.searchedUsers = mongoose.model('searchedUsers',{
    name:String,
    profileSearch:Number,
    compared:Number,
});

module.exports.GlobalStats = mongoose.model('globals',{
    name:String,
    count:Number
});

module.exports.Scores = mongoose.model('profilescores',{
    alid:Number,
    scoreType:String,
    score1:Number,
    score2:Number,
    score3:Number,
    score4:Number,
    score5:Number,
    score6:Number,
    score7:Number,
    score8:Number,
    score9:Number,    
    score10:Number,
    score15:Number,
    score20:Number,
    score25:Number,
    score30:Number,
    score35:Number,
    score40:Number,
    score45:Number,
    score50:Number,
    score55:Number,
    Score60:Number,
    score65:Number,
    score70:Number,
    score75:Number,
    score80:Number,
    score85:Number,
    score90:Number,
    score95:Number,
    score100:Number
});