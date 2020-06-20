<template>
  <div>
    <div class="musicmtop">
    <div class="musicmtopf1" @click="sidebar"><van-icon name="wap-nav" /></div>
    <ul>
      <li v-for="(item) in lifor" :key="item.id" :class="{libd:item.id==liif}" @click="tabli(item.id)">{{item.name}}</li>
    </ul>
    <div class="musicmtopf2"><van-icon name="search" /></div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
        lifor:[{id:0,name:'推荐'},{id:1,name:'歌手'},{id:2,name:'排行'},{id:3,name:'搜索'}],
        liif:0
    }
  },
  components: {

  },
  methods: {
  tabli(id){
    this.liif=id
    switch(id){
      case 0:
      this.$router.push('/musicmmain')
      break;
      case 1:
      this.$router.push('/musicsinger')
      break
      case 2:
      this.$router.push('/musicmpaihan')
      break
      case 3:
      this.$router.push('/musicsearch')
      break
    }
  },
  sidebar(){
    this.$emit("sidebarcz")
  }
  }
}
</script>

<style scoped="scoped">
  .musicmtop{
    font-family: "黑体";
    font-size: 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10vw;
  }
  .musicmtop ul{
    color: #969799;
    display: flex;
    width: 50vw;
    justify-content: space-around;
  }
  .musicmtop ul li{
    width: 13vw;
    border-radius: 50%;
    transform: background-color 3s;
    align-items: center;
    height: 13vw;
    display: flex;
    justify-content: center;
  }
.musicmtopf1{
    padding-left: 2vw;
    font-size: 6vw;
  }
.musicmtopf2{
    padding-right: 2vw;
    font-size: 6vw;
  }
  .libd{
    font-weight: 1000;
    color: #000000;
    transition: all 2s ease-out;
  }
  .musicmtop ul li:hover{
    transform: scale(1.5);
  }

</style>
