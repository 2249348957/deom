<template>
  <div class="musicrank">
  <transition name="fade">
    <div class="musicbfqbf" v-show="musicbfqshow">
        <musicbfq></musicbfq>
    </div>
  </transition>
      <div class="musicranktop">
        <div class="musicranki" @click="$router.push('/musicmmain')">
          <van-icon name="arrow-left" />
        </div>
        <div class="musicranktext" v-if="musiclist.name">{{musiclist.name}}</div>
      </div>
      <img v-if="image" :src="image" alt="" style="height: 65vw;"/>
      <img v-else src="../assets/bj1.jpg" alt=""/>
        <loading v-if="loadingif"></loading>
      <scroll :height="63">
        <div>
         <div v-if="musiclist" class="musicrankmain" v-for="(item,index) in musiclist.tracks" :key="index" @click="yybfq(item.id)">
              <div class="musicrankmainbody">
                <p class="p1">{{item.name}}</p>
                <p class="p2">{{item.ar[0].name}}</p>
              </div>
          </div>
        <!--  <div v-else class="musicrankmain" v-for="(items,indexs) in musisinge" :key="indexs" @click="yybfq(items.id)">
               <div class="musicrankmainbody">
                 <p class="p1">{{items.name}}</p>
                 <p class="p2">{{items.ar[0].name}}</p>
               </div>
           </div> -->
        </div>
      </scroll>
      <musicmainfoot v-show="!musicbfqshow"></musicmainfoot>
  </div>
</template>
<script>
  import musicmainfoot from '@/components/musicmain/musicmainfoot.vue'
  import musicbfq from '@/vivew/musicbfq.vue'
  import loading from '@/components/Loading/loading.vue'
  import {mapState} from 'vuex'
  import scroll from '@/components/common/Scroll.vue'
  import axios from 'axios'
export default{
  name:'musicrank',
  data () {
    return {
      info:{},
      musiclist:{},
      musisinge:[],
      image:'',
      footfbq:true,
      action:{
        top:'api/top/list',
        detail:'api/playlist/detail',
        song:'api/artist/top/song'

      }
    }
  },
  watch:{
    musicbfqshow(e){
    }
  },
  computed:{
    ...mapState([
      'loadingif'
    ]),
    musicbfqshow(){
      return this.$store.state.musicbfqif
    }
  },
  components: {
scroll,loading,musicbfq,musicmainfoot
  },
  methods: {
    byidtop(){
      this.$store.commit('showLoading')
      axios.get(this.action.top+"?id="+this.$route.query.musicid).then((res)=>{
        this.musiclist = res.data.playlist
        this.$store.commit('hideLoading')
      })
    },
    byiddetail(){
      this.$store.commit('showLoading')
      axios.get(this.action.detail+"?id="+this.$route.query.musicid).then((res)=>{
        this.musiclist = res.data.playlist
        this.$store.commit('hideLoading')
      })
    },
    byidsong(){
      this.$store.commit('showLoading')
      axios.get(this.action.song+"?id="+this.$route.query.musicid).then((res)=>{

        var tracks = {}

      var list = res.data.songs.map((time)=>{
        var li = {}
          li.ar=[]
          li.name = time.name
          li.id = time.id
          li.ar.push({'name':time.ar[0].name})
          this.musisinge.push(li)
          return this.musisinge
        })
          tracks={'tracks':this.musisinge}
          this.musiclist = tracks
        this.$store.commit('hideLoading')
    })
    },
    yybfq(id){
      this.$store.commit('yyid',id)
      this.$store.commit('yybfq')
      this.$store.commit('yyimgbfkz')
     // this.$router.push({path:'/musicbfq',query:{id:id}})
    }
  },
  mounted() {
    if(this.$route.query.istj==2){
      this.byidtop()
    }else if(this.$route.query.istj==1){
      this.byiddetail()
    }else if(this.$route.query.istj==3){
      this.byidsong()
    }else{
      return
    }

  },
  created() {

    this.image = this.$route.query.musicimg
  }
}
</script>

<style scoped="scoped">
  .musicrank{
    position: relative;
    width: 100%;
  }
  .musicranktop{
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh;
  }
  .musicranki{
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    font-size: 5vw;
    position: absolute;
    left: 0;
  }
  .musicranktext{
    padding: 0 40px;
    display: flex;
    flex-wrap: wrap;
    font-size: 5vw;
    color: #FFFFFF;
    font-weight: bold;
  }
  .musicrank img {
    top: 0;
    z-index: -1;
    width: 100%;
  }
  .musicrankmain{
    width: 100%;
    height: 10vh;
  }
  .musicrankmainbody{
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-right: 10px;
  }
  .musicrankmainbody .p1{
    color: #0000FF;
    padding: 5px;
  }
  .musicrankmainbody .p2{
    color: #999988;
    padding: 5px;
  }
  .musicbfqbf{
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
