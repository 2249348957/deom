<template>
  <div class="musicmmain">
    <scroll :list="tjgdlist" :height="90">
      <div>
    <div class="musicmtopf5">
     <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
       <van-swipe-item v-for="(item,idnex) in lbtlist" :key="idnex">
         <img :src="item.pic" alt="">
         </van-swipe-item>
     </van-swipe>
    </div>
      <div class="musicmmainf1">
        <span>推荐歌单</span>
        <label>歌单工厂</label>
      </div>
      <div class="musicmmainf2">
        <div class="musicmmainf3">
        <div class="musicmmainf4" v-for="(tiem,index) in tjgdlist" :key="index" @click="tzmusicrank(tiem.id,tiem.picUrl)">
            <div><!-- <van-icon name="user-o" /> -->{{tiem.copywriter}}</div>
            <img :src="tiem.picUrl" alt=""/>
            <p>{{tiem.name}}</p>
          </div>
        </div>
      </div>
      </div>
      </scroll>
  </div>
</template>
<script>
  import scroll from '@/components/common/Scroll.vue'
  import axios from 'axios'
export default{
  data () {
    return {
      lbtlist:[],
      tjgdlist:[],
      action:{
        banner:'api/banner?type=2',
        playlist:'api/personalized'
      }
    }
  },
  components: {
  scroll
  },
  methods: {
    mainlbt(){
      // var params = new URLSearchParams();
      //    params.append('account', this.model.account);
      //    params.append('password', this.model.password);
       axios.get(this.action.banner).then(res=>{
           this.lbtlist = res.data.banners
      })
    },
    tjgdmessage(){
      axios.get(this.action.playlist).then(res=>{
        this.tjgdlist = res.data.result
      })
    },
    tzmusicrank(id,img){
       this.$router.push({path: "/musicrank", query: {musicid:id,musicimg:img,istj:1}})
    }
  },
  created() {
    this.mainlbt()
    this.tjgdmessage()
  }
}
</script>

<style scoped="scoped">
  .musicmmain{
    width: 100%;
    height: 90vh;
  }
  .musicmmain .musicmmainf1{
    width: 100%;
    display: flex;
    padding: 2vw 0;
    justify-content: space-between;
    align-items: center;
  }
  .musicmmainf1 span{
    font-family: "黑体";
    padding-left: 2vw;
    font-size: 4.4vw;
    font-weight: bold;
  }
  .musicmmainf1 label{
    padding: 3px 2vw;
    margin-right: 2vw;
    border: 1px solid #999988;
    border-radius: 20px;
    font-size: 1vw;
  }
  .musicmmainf2{
    width: 100%;
  }
  .musicmmainf3{
    padding: 0 2vw;
    display: flex;
    flex-wrap: wrap;
  }
  .musicmmainf4{
    position: relative;
    width: 28vw;
    height: 38.5vw;
    text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 2vw;
  }
  .musicmmainf4 img{
    width: 28vw;
    height: 29vw;
    border-radius: 5px;
  }
  .musicmmainf4 p{
    font-size: 3vw;
    letter-spacing: 1px;
  }
 .musicmmainf4 div{
   position: absolute;
   display: flex;
   align-items: center;
   top: 0;
   right: 1vw;
   z-index: 10;
   font-size: 3vw;
   font-family: "黑体";
   color: white;
   letter-spacing: 1px;
 }
 .musicmtopf5{
   width: 100%;
 }
 .musicmtopf5 img{
   width: 100%;
   height: 48vw;
 }
  .my-swipe .van-swipe-item {
   }
</style>
