<template>
  <div class="musicsearch">
      <div>
        <div class="musicsearchinput">
          <van-icon name="search" size="medium"/><input v-model="music" type="text" placeholder="搜索歌曲"/>
        </div>

         <div class="sslist" v-show="yyssxlk">

           <div class="sslistmain" v-if="yyss.album">
       <!--      <div style="display: flex;align-items: center;">{{yyss.singer.name}}：</div> -->
             <div class="sslistmainss">
               <!-- <transition-group name="list" tag="p"> -->
                <p @click="routreid(items)" v-for="(items,indexs) in this.yyss.album" :key="items.id" class="list-item">{{items.name}}&nbsp;{{items.artist.name}}</p>
               <!-- </transition-group> -->
             </div>
           </div>
            <div class="sslistmain" v-if="yyss.video">
         <!--     <div style="display: flex;align-items: center;">{{yyss.song.name}}：</div> -->
              <div class="sslistmainss">
                <!-- <transition-group name="list" tag="p"> -->
                 <p @click="routreartid(item)" v-for="(item,index) in this.yyss.video" :key="index" class="list-item">{{item.title}}</p>
                <!-- </transition-group> -->
              </div>
            </div>
         </div>

      </div>

      <div class="musicsearchmain">
        <p>热门搜索</p>
        <div class="musicsearchmainul">
            <div class="musicsearchmainli">
              <div class="musicsearchmainbutt" v-for="(item,index) in names" :key="index" @click="music=item.first">{{item.first}}</div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
export default{
  data () {
    return {
      yyssxlk:false,
      names:[],
      music:'',
      yyss:{},
      singerlength:0,
      songlength:0,
      action:{
        hot:'api/search/hot',
        quick:'api/search/multimatch'
      }
    }
  },
  components: {

  },
  watch:{
    music(text){
      if(text!=""){
        this.starttime = event.timeStamp;
               let _this=this;
               let e = event;
               setTimeout(()=>{
                    if (_this.starttime - e.timeStamp == 0) {
                    this.selectyy()
                    }
               },500)
      }else{
        this.starttime = event.timeStamp;
               let _this=this;
               let e = event;
               setTimeout(()=>{
                    if (_this.starttime - e.timeStamp == 0) {
                     this.yyssxlk=false
                    }
               },10)

      }
    }
  },
  methods: {
    hotlmss(){
      axios.get(this.action.hot).then((res)=>{
        this.names = res.data.result.hots
      })
    },
    selectyy(){
      axios.get(this.action.quick+"?keywords="+this.music).then((res)=>{
        this.yyss = res.data.result
        console.log(this.yyss)
        this.yyssxlk=true
      })
    },
    routreid(id){
      this.$toast('还未实现');
       // this.$router.push({path:'/musicbfq',query:{id:id.id}})
    },
    routreartid(id){
      this.$toast('还未实现');
    // this.$router.push({path:'/musicbfq',query:{id:id.vid}})
    }
  },
  created() {
    this.hotlmss()
  }
}
</script>

<style scoped="scoped">
  .musicsearch{
  }
  .musicsearchinput{
    width: 85%;
    height: 5vh;
    margin: 10px 20px;
    padding: 0 5px;
    border-radius: 5px;
    background-color: #E9E9EB;
    display: flex;
    align-items: center;
  }
  .musicsearchinput input{
    border: none;
    padding-left: 10px;
    width:80%;
    height: 90%;
    background-color:#E9E9EB;
  }
  .musicsearchmain{
    width: 100%;
  }
  .musicsearchmain p{
    padding-left: 20px;
    margin: 20px 0;
    color: #999988;
    font-size: 4.5vw;
  }
  .musicsearchmainli{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 20px;
  }
  .musicsearchmainbutt{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 8px;
    margin: 2vw;
    font-size: 2.8vw;
    color: #040405;
    border-radius: 10px;
    background-color: #E9E9EB;
  }
  .sslist{
    position: absolute;
    width: 100%;
    z-index: 10;
    background-color: #FFFFFF;
    box-shadow: 1px 0px 10px #999999;
  }
  .sslistmain{
    display: flex;
    margin: 0 30px;
  }
  .sslistmainss{
    width: 70vw;
  }
  .sslistmainss p{
    padding: 7px 0;
    background-color: ;
    border-bottom: 1px solid #CED4DA;
  }
   .sslistmainss p:hover{
     background-color: #D3D4D6;
   }

   .list-item {
     display: inline-block;
     margin-right: 10px;
   }
   .list-enter-active, .list-leave-active {
     transition: all 1s;
   }
   .list-enter, .list-leave-to
   /* .list-leave-active for below version 2.1.8 */ {
     opacity: 0;
     transform: translateY(30px);
   }
</style>
