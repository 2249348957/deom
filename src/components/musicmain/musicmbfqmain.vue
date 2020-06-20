<template>
  <div class="musicmbfqmain" @click="gcxs">
    <div class="musicmbfqmaingcbf">
        <div v-show="gcif" :class="imgif?'musicmbfqmainimg':'musicmbfqmainimgif'">
          <img :src="musicimg" @click="imgxz"/>
        </div>
        <div v-show="!gcif" class="musicmbfqmainrcs">
          <div class="gckz" ref="gckz">
              <p ref="pid" :id="item[0]+1" v-for="(item,index) in text" :key="index">{{item[1]}}</p>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default{
  props:{
    musicimg:{
      type:Object
    },
    musiclrcs:{
      type:String
    }
  },
  data () {
    return {
        gcif:true,
        imgif:false,
        text:[],
        num:[]
    }
  },
  computed:{
    count(){
      return this.$store.state.currentTime
    },
    yyimgkz(){
      return this.$store.state.yyimgbf
    }
  },
  watch:{
    count(e){
      if(e==0){
        for(var l=0;l<this.$refs.pid.length;l++){
         this.$refs.pid[l].style.color="lightyellow"
         this.num=[]
        }
        return
      }
      for(var i=0;i<this.$refs.pid.length;i++){
        if(this.$refs.pid[i].id==(e)){
          this.num.push(i)
          for(var a of this.num){
            this.$refs.pid[a].style.color="yellow"
          }
          if(this.$refs.pid[i].id==(e)){
             this.$refs.gckz.style.top = -3 * (i-5) + "vh";
          }
        }
      }

    },
    yyimgkz(e){
      if(e){
        this.imgif = false
      }else{
        this.imgif = true
      }
    },
    musiclrcs(e){
      setTimeout(()=>{
        this.kcjx()
        for(var l=0;l<this.$refs.pid.length;l++){
         this.$refs.pid[l].style.color="lightyellow"
        }
      },1000)

      setTimeout(()=>{
        this.gcif=false
      },5000)
    }
  },
  methods: {
  imgxz(){
    event.stopPropagation();
    if(this.imgif){
      this.$store.commit('yyimgbfkz')
      this.imgif = false
    }else{
      this.$store.commit('yyimgbfkzif')
      this.imgif = true
    }
  },
  kcjx(){
    var lrcArr = this.musiclrcs.split("[")
    var d=[]
    for(var i=0;i<lrcArr.length;i++){
      var t =[]
      var arr = lrcArr[i].split(']')
      var time = arr[0].split(".")
      var timer = time[0].split(":")
      var ms = parseInt(timer[0] * 60) + parseInt(timer[1])
      if(isNaN(ms)){
        ms=1
      }
      if(arr[1]!=undefined){
        t[0]=ms
        t[1]=arr[1]
         d.push(t)
      }
    }

    for(var u=0;u<d.length;u++){
      if(d[u][1].indexOf("\n") < 1){
        d.splice(u,1)
      }
    }
     this.text = d
  },
  gcxs(){
    if(this.gcif==true){
      this.gcif=false
    }else{
      this.gcif=true
    }
  }
  },
  mounted() {

    // // var muMusic=document.getElementById("myMusic")
    // // var oP = document.getElementsByClassName("op")
    // //  console.log(oP)
    //  this.$refs.gckz.addEventListener("timeupdate",function(){
    //    // var curTime = parseInt(this.curTime)
    //    // if(document.getElementById(curTime)){
    //    //   for(var i=0;i<oP.length;i++){
    //    //    oP[i].style.cssText = "font-size: 100px;"
    //    //   }
    //    // }
    //    console.log(11)
    //  })
  }

}
</script>

<style scoped="scoped">
  .musicmbfqmain{
    width: 100%;
  }
  .musicmbfqmaingcbf{
    z-index: 100;
    display: flex;justify-content: center;align-items: center;
    width: 100%;
    height: 70vh;
  }
  .musicbfqfoort{
    position: fixed;
    bottom: 0;
    height: 10vh;
    width: 100%;
  }
   .musicmbfqmainimgif{
     width: 60vw;height: 60vw;background-color: #000000;overflow: hidden; border-radius: 50%;
     -webkit-box-shadow: #FF3300 0px 0px 15px;
     -moz-box-shadow: #FF3300 0px 0px 15px;
     box-shadow: #FF3300 0px 0px 15px;
     animation: myfirst 15s infinite linear;
     -moz-animation: myfirst 15s infinite linear;	/* Firefox */
     -webkit-animation: myfirst 15s infinite linear;	/* Safari 和 Chrome */
     -o-animation: myfirst 15s infinite linear;	/* Opera */
   }

  .musicmbfqmainimg{
    width: 60vw;height: 60vw;background-color: #000000;overflow: hidden; border-radius: 50%;
    -webkit-box-shadow: #FF3300 0px 0px 15px;
    -moz-box-shadow: #FF3300 0px 0px 15px;
    box-shadow: #FF3300 0px 0px 15px;
    animation: myfirst 15s infinite linear;
    -moz-animation: myfirst 15s infinite linear;	/* Firefox */
    -webkit-animation: myfirst 15s infinite linear;	/* Safari 和 Chrome */
    -o-animation: myfirst 15s infinite linear;	/* Opera */
    animation-play-state:paused;
  }
  @keyframes myfirst{
    from{
      transform:rotate(0deg);
      -ms-transform:rotate(0deg); 	/* IE 9 */
      -moz-transform:rotate(0deg); 	/* Firefox */
      -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
      -o-transform:rotate(0deg);
    }
    to{
      transform:rotate(360deg);
      -ms-transform:rotate(360deg); 	/* IE 9 */
      -moz-transform:rotate(360deg); 	/* Firefox */
      -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
      -o-transform:rotate(360deg);
    }
  }
  .musicmbfqmainimg img{
    width: 100%;
    height: 100%;
  }
  .musicmbfqmainimgif img{
    width: 100%;
    height: 100%;
  }
  .musicmbfqmainrcs{
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 40vh;
    overflow: hidden;
  }
  .gckz{
    position: absolute;
    top: 0;
    width: 100%;
  }
  .musicmbfqmainrcs p{
    font-size: 4vw!important;
    color: lightyellow;
    font-size: 15px;line-height: 3vh;margin: 0;padding: 0;
  }
  .gckz .op{
    color: #0000FF;
  }
</style>
