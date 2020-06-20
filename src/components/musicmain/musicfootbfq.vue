<template>
  <div class="musicfootbfq">
  <audio ref="audio" :src="yyurl.url" controls="controls" @timeupdate="updateTime" loop></audio>
<!--    <div style="margin: 10px auto;width: 100%;"><van-progress :percentage="parseInt((count/zgcsj)*100)" /></div>
    <div class="handle">
      <van-icon name="play-circle-o" v-if="buttyy" @click="audioPlay" />
      <van-icon name="pause-circle-o" v-else @click="audioPlay" />
    </div> -->
  </div>
</template>
<script>
export default{
  data () {
    return {
      musicurl:"",
      currentTime:0,
      buttyy:true,
      lyricTimer:0
    }
  },
  components: {

  },
  computed:{
    count(){
      return this.$store.state.currentTime
    },
    zgcsj(){
      return this.$store.state.lyricTimer
    },
    yyimgkz(){
      return this.$store.state.yyimgbf
    },
    yyurl(){
      return this.$store.state.musicurl
    }
  },
  watch:{
    yyimgkz(e){
      let {audio,audioBat} = this.$refs
      if(e){
        audio.play()
        this.buttyy = false
      }else{
        audio.pause()
        this.buttyy = true
      }
    }
  },
  methods: {
    updateTime(e){
    this.lyricTimer = parseInt(e.target.duration)
    this.currentTime=parseInt(e.target.currentTime)
    this.$store.commit("gczTime",this.lyricTimer)
    this.$store.commit("gcTime",this.currentTime)
    },
    //控制音乐播放和暂停
    audioPlay(){
      let {audio,audioBat} = this.$refs
      if(this.buttyy){
        audio.play()
        this.buttyy = false
        this.$store.commit('yyimgbfkz')
      }else{
        audio.pause()
        this.buttyy = true
        this.$store.commit('yyimgbfkzif')
      }
      // let {audio,audioBat} = this.$refs

     // if(this.buttyy){
     //   audio.play()
     //   this.buttyy = false
     // }else{
     //   audio.pause()
     //   this.buttyy = true
     //   window.clearInterval(this.lyricTimer)
     // }

    },
    audioHandle(){
      //控制音乐的自动播放
      let play=()=>{
        this.audioPlay()
        //document.removeEventListener('touchstart',play)
      }
      play()
      document.addEventListener('WeixinJSBridgeReady',play);
       //document.addEventListener('touchstart',play);
    }
    // lyricAuto(){
    //   let {audio} = this.$refs
    //   if(!audio) return;
    //   window.clearInterval(this.lyricTimer);
    //   this.lyricTimer = window.setInterval(()=>{
    //     console.log(this.$store.state.currentTime)
    //   },1000);
    // }

},
  mounted() {

   this.audioHandle()
  },
  created() {

  }
}
</script>

<style scoped="scoped">
.musicfootbfq {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 10vh;
}
.handle {
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  font-size: 12vw;
}
</style>
