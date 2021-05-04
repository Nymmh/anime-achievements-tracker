<template >
    <center><div v-anime="{ rotate: '1turn', color:'#fff', duration: 15000, loop: true,}" style="pointer-events:none;min-width:100px;min-height:100px;display:inline-block;z-index:1000;"><p style="text-align:center;vertical-align: middle;color:#fff;font-size:1.5rem;">{{getEmoji}}</p></div></center>
</template>
<script>
export default {
    name: "all",
    components:{},
    data() {
        return {
            emojis:[
                '(* ^ ω ^)',
                '(o^▽^o)',
                'ヽ(・∀・)ﾉ',
                '(o･ω･o)',
                '( ´ ω ` )',
                '(´• ω •`)',
                '(´｡• ᵕ •｡`)',
                '(´･ᴗ･ ` )',
                '(´ ∀ ` *)',
                '(´｡• ω •｡`)',
                '(─‿‿─)',
                '(◕‿◕)',
                '＼(≧▽≦)／',
                '(ﾉ´ヮ`)ﾉ*: ･ﾟ',
                'ヽ(*・ω・)ﾉ',
                '(≧◡≦)',
                '(*≧ω≦*)',
                '(„• ֊ •„)',
                '(*♡∀♡)',
                '(*˘︶˘*).｡.:*♡',
                '♡ (⇀ 3 ↼)',
                '❤ (ɔˆз(ˆ⌣ˆc)',
                '(´,,•ω•,,)♡',
                '(｡・//ε//・｡)',
                "♡ ～('▽^人)",
                '(//ω//)',
                '(*ﾉωﾉ)',
                '(⁄ ⁄•⁄ω⁄•⁄ ⁄)',
                '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)',
                '( 〃▽〃)',
                '(＞﹏＜)',
                '(￢_￢;)',
                '(〃＞＿＜;〃)',
                '(￣ ￣|||)',
                '(ノ_<。)',
                '( ╥ω╥ )',
                '(｡•́︿•̀｡)',
                '(╯︵╰,)',
                '.･ﾟﾟ･(／ω＼)･ﾟﾟ･.',
                '｡ﾟ･ (>﹏<) ･ﾟ｡',
                '~(>_<~)',
                '..・ヾ(。＞＜)シ',
                '〜(＞＜)〜',
                '＼(º □ º l|l)/',
                'ヽ(ー_ー )ノ',
                '(￣ω￣;)',
                '(〃￣ω￣〃ゞ',
                '(・・ ) ?',
                '╮(￣ω￣;)╭',
                '( : ౦ ‸ ౦ : )',
                '~ヾ(・ω・)',
                'ヾ(・ω・*)',
                '⊂(･ω･*⊂)',
                '(^_<)〜☆',
                '☆⌒(ゝ。∂)',
                '☆⌒(≧▽​° )',
                '(－ω－) zzZ',
                '(∪｡∪)｡｡｡zzZ',
                '(＿ ＿*) Z z z',
                '(=^ ◡ ^=)',
                'ʕ •̀ o •́ ʔ',
                'V●ᴥ●V',
                '／(≧ x ≦)＼',
                '<・ )))><<',
                '( ˘▽˘)っ♨',
                '(oT-T)尸',
                '┬─┬ノ( º _ ºノ)',
                '(￣^￣)ゞ',
                '(⌐■_■)',
                '｀、ヽ｀ヽ｀、ヽ(ノ＞＜)ノ ｀、ヽ｀☂ヽ｀、ヽ',
                '‿︵‿︵‿︵‿ヽ(°□° )ノ︵‿︵‿︵‿︵',
                '〜〜(／￣▽)／　〜ф',
                '_(:3 」∠)_',
                'ଘ(੭ˊᵕˋ)੭* ੈ✩‧₊˚',
                'ଘ(੭ˊ꒳​ˋ)੭✧'
            ],
            getEmoji:""
        };
    },
    created(){
        this.loading();
    },
    updated(){
        this.loading();
    },
    methods:{
        loading:function(){
            const idx = Math.floor(Math.random() * this.emojis.length)
            this.getEmoji = this.emojis[idx]
        }
    }
}
</script>