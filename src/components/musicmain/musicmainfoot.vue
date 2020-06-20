<template>
  <div class="musicfootbfq" @click="kzbfqxs">
    <div style="margin: 10px auto;width: 100%;"><van-progress color="#f2826a" :percentage="parseInt((count/zgcsj)*100)" /></div>
    <div class="handle">
      <van-icon name="play-circle-o" color="#f2826a" v-if="buttyy" @click.stop="audioPlay" />
      <van-icon name="pause-circle-o" color="#f2826a" v-else @click.stop="audioPlayif" />
    </div>
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
  },
  methods: {
    //控制音乐播放和暂停
    audioPlay(){
        this.buttyy=false
        this.$store.commit('yyimgbfkz')
     },
      audioPlayif(){
        this.$store.commit('yyimgbfkzif')
        this.buttyy=true
      },
      kzbfqxs(){
        this.$store.commit('yybfq')
      }
},
  mounted() {
  },
  created() {

  }
}
</script>

<style scoped="scoped">
.musicfootbfq {
  position: fixed;
  bottom: 0;
  /* background-color:#f2826a; */
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

