<template>
  <div class="musicpaihan">
    <loading v-if="loadingif"></loading>
    <scroll :list="paihlist" :height="90">
      <div>
      <ul>
        <li v-for="(items,indexs) in paihlist" :key="indexs" @click="tzmusicrank(items.id,items.coverImgUrl)">
          <musicpaihanmain :paihmain="items"></musicpaihanmain>
        </li>
      </ul>
      </div>
      </scroll>
  </div>
</template>
<script>
  import loading from '@/components/Loading/loading.vue'
  import {mapState} from 'vuex'
  import axios from 'axios'
  import scroll from '@/components/common/Scroll.vue'
  import musicpaihanmain from '@/components/musicmain/musicpaihanmain.vue'
export default{
  data () {
    return {
      action:{
        category:'api/toplist'
      },
      paihlist:[]
    }
  },
  components: {
musicpaihanmain,scroll,loading
  },
  computed:{
    ...mapState([
      'loadingif'
    ])
  },
  methods: {
   async categorygq(){
     this.$store.commit('showLoading')
     await axios.get(this.action.category).then((res)=>{
        this.paihlist = res.data.list
        this.$store.commit('hideLoading')
      })
    },
    tzmusicrank(id,img){
       this.$router.push({path: "/musicrank", query: {musicid:id,musicimg:img,istj:2}})
    }
  },
  created() {
     this.categorygq()
  }
}
</script>

<style scoped="scoped">
.musicpaihan{
  background-color: #FFFFFF;
  width: 100%;
  height: 90vh;
}
.musicpaihan p{
  font-size: 4.5vw;
  font-weight: bold;
  padding-left: 2vw;
  padding-bottom: 2vw;
}
</style>
