<script>
import {Pie} from 'vue-chartjs'
import axios from 'axios'
export default {
    name: 'genrechart',
    props:['username'],
    extends: Pie,
    data:()=>({
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
      sports:0,
      chartdata:{
        labels:[],
        datasets:[{
          data:[],
          backgroundColor: [],
        }]
      },
      options:{
        responsive: true,
        maintainAspectRatio: false,
      }
    }),
    mounted(){
      this.updateChart();
    },
    updated(){
      this.updateChart();
    },
    methods:{
      updateChart: function(){
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
            this.chartdata.labels.push('Action','Adventure','Comedy','Drama','Ecchi','Fantasy','Horror','Mahou Shoujo','Mecha','Music','Mystery','Psychological','Romance','Sci-Fi','Slice of Life','Sports','Supernatural','Thriller');
            this.chartdata.datasets[0].backgroundColor.push('#f54334','#ea2064','#9d27b0','#673cb8','#3e52b6','#2197f1','#07a8f3','#009688','#03bbd6','#4cb051','#8dc54e','#cddb3c','#ffec3c','#ffc207','#ff9800','#ff5529','#9e9e9e','#627d8b')
            this.chartdata.datasets[0].data.push(this.action,this.adventure,this.comedy,this.drama,this.ecchi,this.fantasy,this.horror,this.magicalGirl,this.mecha,this.music,this.mystery,this.psychological,this.romance,this.sciFi,this.sliceOfLife,this.sports,this.supernatural,this.thriller);
            this.renderChart(this.chartdata, this.options)
        })
      }
    }
}
</script>