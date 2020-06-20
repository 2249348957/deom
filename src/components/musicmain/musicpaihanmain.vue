<template>
  <div class="musicpaihanmain">
    <div class="musicpaihanmainf1">
      <img :src="paihmain.coverImgUrl" alt=""/>
      <p>{{paihmain.name}}</p>
    </div>
    <div class="musicpaihanmainf2">
      <p>{{paihmain.description}}</p>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
export default{
  props:{
    paihmain:{
    type:Object
    }
  },
  data () {
    return {
        action:{
          top:'api/top'
        }
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped="scoped">
  .musicpaihanmain{
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px;
  }
  .musicpaihanmain .musicpaihanmainf1{
    position: relative;
    width: 27vw;
    height: 27vw;
    border: none;
    padding-left: 1vw;

  }
  .musicpaihanmain .musicpaihanmainf1 p{
    position: absolute;
    bottom: 5px;
    width: 100%;
    left: 5px;
    color: white;
    font-size: 2.5vw;
  }
  .musicpaihanmain .musicpaihanmainf1 img{
    width: 100%;
    height: 100%;
    box-shadow: inset 0 10px 10px #000000;
  }
  .musicpaihanmain .musicpaihanmainf2{
    display: flex;
    height: 27vw;
    width: 65%;
    border: none;
    margin-right: 30px;
    padding-left: 10px;
    justify-content: space-around;
    flex-direction: column;
    box-shadow:0px 2px 8px #999988;
    box-shadow:0px -2px 8px #999988;
    box-shadow:0px 0px 8px #999988;
  }
  .musicpaihanmainf2 p{
    color: #999999;
  }
</style>
