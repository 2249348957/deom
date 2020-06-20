<template>
  <div class="musicmain">
    <transition name="slide-fade">
    <div class="musicadiso" v-show="musicadiso">
      <span @click="sidebar">&nbsp;&nbsp;&nbsp;收</span>
      <RouterLink to="/"><span>返回首页</span></RouterLink>
      <div style="position: absolute;bottom: 0;font-size: 1vw;">
        第一次做音乐播放器项目，布局比较随意，而且设计出错，导致出现很多bug，先用着吧，能听歌就行，反正只是娱乐，bug以后在修复，
        音乐播放器后台是用的网易云音乐api（感谢网络上提供此api接口的大佬），前端用的vue框架+vant组件库.
      </div>
    </div>
     </transition>
    <div class="musicadisos" v-show="musicadiso" @click="sidebar">
    </div>

    <musicmtop @sidebarcz="sidebar"></musicmtop>
    <keep-alive>
    <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import musicmtop from '@/components/musicmain/musicmtop.vue'
export default{
  data () {
    return {
      musicadiso:false
    }
  },
  components: {
musicmtop
  },
  methods: {
    sidebar(){
      if(this.musicadiso){
        this.musicadiso=false
        return
      }else{
        this.musicadiso=true
        return
      }

    }
  },
  mounted() {
  }
}
</script>

<style scoped="scoped">
  .musicmain{
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #FFFFFF;
  }
  .musicadiso{
    z-index: 100;
    left: 0;
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 70vw;
    height: 100vh;
    background-color: #909399;
  }

  .musicadisos{
    position: absolute;
    z-index: 99;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    opacity: 0.3;
  }
  .musicadiso span{
    color: white;
  }
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-70vw);
  opacity: 0;
}
</style>
