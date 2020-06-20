<template>
<div class="musicbfq">
<musicbfqtop :musicname="musicxq"></musicbfqtop>
<musicmbfqmain :musiclrcs="yylrc" :musicimg="musicimg"></musicmbfqmain>
<musicfootbfq :yyurl="yyurl"></musicfootbfq>
</div>
</template>
<script>
  import musicfootbfq from '@/components/musicmain/musicfootbfq.vue'
  import musicmbfqmain from '@/components/musicmain/musicmbfqmain.vue'
  import musicbfqtop from '@/components/musicmain/musicbfqtop.vue'
  import axios from 'axios'
export default{
  data () {
    return {
      action:{
        url:'api/song/url',
        detail:'api/song/detail',
        lyric:'api/lyric'
      },
      musicurl:"",
      musicxq:'',
      musicimg:'',
      musiclrc:''
    }
  },
  components: {
musicbfqtop,musicmbfqmain,musicfootbfq
  },
  computed:{
    yylrc(){
      return this.$store.state.musiclrc
    },
    yyxq(){
      return this.$store.state.musicxq
    },
    yyurl(){
      return this.$store.state.musicurl
    },
    yyid(){
      return this.$store.state.musicid
    }
  },
  watch:{
    yyurl(){},
    yyxq(){},
    yylrc(){},
    yyid(e){
      if(e!==null){
        this.hqumusicurl()
        this.musicdetail()
        this.musicdlyric()
      }
    }
  },
  methods: {
  async hqumusicurl(){
      const res =await axios.get(this.action.url+"?id="+this.$store.state.musicid)
      for(let item of res.data.data){
        this.musicurl=item
        this.$store.commit('yymusicurl',this.musicurl)
      }

    },
    async musicdetail(){
        const res =await axios.get(this.action.detail+"?ids="+this.$store.state.musicid)
        for(let item of res.data.songs){
          this.musicimg=item.al.picUrl
          this.musicxq = item
          //this.$store.commit('yymusicxq',item)
          for(let itemd of item.ar){
          this.musicxq.grname = itemd.name
          }
         // this.$store.commit('yymusicxq',item.grname)
        }
      },
      async musicdlyric(){
        const res = await axios.get(this.action.lyric+"?id="+this.$store.state.musicid)
        //this.musiclrc = res.data.lrc.lyric
        this.$store.commit('yymusiclrc',res.data.lrc.lyric)
      }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
    this.$store.commit('yyimgbfkzxg')
  }
}
</script>

<style scoped="scoped">
.musicbfq{
  font-family: "汉仪旗黑";
  width: 100%;
  height: 100vh;
 background: #485563;  /* fallback for old browsers */
 background: -webkit-linear-gradient(to right, #29323c, #485563);  /* Chrome 10-25, Safari 5.1-6 */
 background: linear-gradient(to right, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}
</style>
