<script>
import {Pie} from 'vue-chartjs'
import axios from 'axios'
export default {
    name: 'scorechart',
    extends: Pie,
    props:['username'],
    data:()=>({
        scoreType:"POINT_100",
        score1:0,
        score2:0,
        score3:0,
        score4:0,
        score5:0,
        score6:0,
        score7:0,
        score8:0,
        score9:0,
        score10:0,
        score15:0,
        score20:0,
        score25:0,
        score30:0,
        score35:0,
        score40:0,
        score45:0,
        score50:0,
        score55:0,
        Score60:0,
        score65:0,
        score70:0,
        score75:0,
        score80:0,
        score85:0,
        score90:0,
        score95:0,
        score100:0,
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
                                scores{
                                    scoreType
                                    score1
                                    score2
                                    score3
                                    score4
                                    score5
                                    score6
                                    score7
                                    score8
                                    score9
                                    score10
                                    score15
                                    score20
                                    score25
                                    score30
                                    score35
                                    score40
                                    score45
                                    score50
                                    score55
                                    Score60
                                    score65
                                    score70
                                    score75
                                    score80
                                    score85
                                    score90
                                    score95
                                    score100
                                }
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
                this.scoreType = result.data.data.profiles[0].stats[0].scores[0].scoreType;
                this.score1 = result.data.data.profiles[0].stats[0].scores[0].score1;
                this.score2 = result.data.data.profiles[0].stats[0].scores[0].score2;
                this.score3 = result.data.data.profiles[0].stats[0].scores[0].score3;
                this.score4 = result.data.data.profiles[0].stats[0].scores[0].score4;
                this.score5 = result.data.data.profiles[0].stats[0].scores[0].score5;
                this.score6 = result.data.data.profiles[0].stats[0].scores[0].score6;
                this.score7 = result.data.data.profiles[0].stats[0].scores[0].score7;
                this.score8 = result.data.data.profiles[0].stats[0].scores[0].score8;
                this.score9 = result.data.data.profiles[0].stats[0].scores[0].score9;
                this.score10 = result.data.data.profiles[0].stats[0].scores[0].score10;
                this.score10 = result.data.data.profiles[0].stats[0].scores[0].score10;
                this.score15 = result.data.data.profiles[0].stats[0].scores[0].score15;
                this.score20 = result.data.data.profiles[0].stats[0].scores[0].score20;
                this.score25 = result.data.data.profiles[0].stats[0].scores[0].score25;
                this.score30 = result.data.data.profiles[0].stats[0].scores[0].score30;
                this.score35 = result.data.data.profiles[0].stats[0].scores[0].score35;
                this.score40 = result.data.data.profiles[0].stats[0].scores[0].score40;
                this.score45 = result.data.data.profiles[0].stats[0].scores[0].score45;
                this.score50 = result.data.data.profiles[0].stats[0].scores[0].score50;
                this.score55 = result.data.data.profiles[0].stats[0].scores[0].score55;
                this.Score60 = result.data.data.profiles[0].stats[0].scores[0].Score60;
                this.score65 = result.data.data.profiles[0].stats[0].scores[0].score65;
                this.score70 = result.data.data.profiles[0].stats[0].scores[0].score70;
                this.score75 = result.data.data.profiles[0].stats[0].scores[0].score75;
                this.score80 = result.data.data.profiles[0].stats[0].scores[0].score80;
                this.score85 = result.data.data.profiles[0].stats[0].scores[0].score85;
                this.score90 = result.data.data.profiles[0].stats[0].scores[0].score90;
                this.score95 = result.data.data.profiles[0].stats[0].scores[0].score95;
                this.score100 = result.data.data.profiles[0].stats[0].scores[0].score100;
                if(this.scoreType == "POINT_100"){
                    this.chartdata.labels.push('5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100');
                    this.chartdata.datasets[0].backgroundColor.push('#ff0000','#f30603','#e70c06','#db130a','#cf190d','#c22010','#b62614','#aa2c17','#9e331a','#92391e','#854021','#794624','#6d4c28','#61532b','#55592e','#486032','#3c6635','#306c38','#18793f','#0b8043')
                    this.chartdata.datasets[0].data.push(this.score5,this.score10,this.score15,this.score20,this.score25,this.score30,this.score35,this.score40,this.score45,this.score50,this.score55,this.score60,this.score65,this.score70,this.score75,this.score80,this.score85,this.score90,this.score95,this.score100);
                }else if(this.scoreType == "POINT_3"){
                    this.chartdata.labels.push('1','2','3');
                    this.chartdata.datasets[0].backgroundColor.push('#ff0000','#854021','#0b8043')
                    this.chartdata.datasets[0].data.push(this.score1,this.score2,this.score3);
                }else if(this.scoreType == "POINT_10_DECIMAL"){
                    this.chartdata.labels.push('5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100');
                    this.chartdata.datasets[0].backgroundColor.push('#ff0000','#f30603','#e70c06','#db130a','#cf190d','#c22010','#b62614','#aa2c17','#9e331a','#92391e','#854021','#794624','#6d4c28','#61532b','#55592e','#486032','#3c6635','#306c38','#18793f','#0b8043')
                    this.chartdata.datasets[0].data.push(this.score5,this.score10,this.score15,this.score20,this.score25,this.score30,this.score35,this.score40,this.score45,this.score50,this.score55,this.score60,this.score65,this.score70,this.score75,this.score80,this.score85,this.score90,this.score95,this.score100);
                }else if(this.scoreType == "POINT_5"){
                    this.chartdata.labels.push('1','2','3','4','5');
                    this.chartdata.datasets[0].backgroundColor.push('#ff0000','#c22010','#854021','#486032','#0b8043')
                    this.chartdata.datasets[0].data.push(this.score1,this.score2,this.score3,this.score4,this.score5);
                }else if(this.scoreType == "POINT_10"){
                    this.chartdata.labels.push('1','2','3','4','5','6','7','8','9','10');
                    this.chartdata.datasets[0].backgroundColor.push('#ff0000','#e40e07','#c91c0e','#ae2a16','#93381d','#784725','#5d552c','#426334','#27713b','#0b8043')
                    this.chartdata.datasets[0].data.push(this.score1,this.score2,this.score3,this.score4,this.score5,this.score6,this.score7,this.score8,this.score9,this.score10);
                }
                this.renderChart(this.chartdata, this.options)
            })
        }
    }
}
</script>