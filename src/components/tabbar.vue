<template>
  <div class="tabbar_f">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item name="home1" icon="wap-home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item name="home2" icon="friends-o" replace to="/comment">空洞</van-tabbar-item>
      <van-tabbar-item name="home3" icon="user-circle-o" @click="bat3">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default{
  props:['act'],
  data () {
    return {
        active: 'home1'
    }
  },
  components: {

  },
  methods: {
    bat1(){
       this.$router.push('/')
    },
    bat2(){
      this.$router.push('/comment')

    },
    bat3(){
      this.$router.push('/userinfo')
    }
  },
  created() {
  }
}
</script>

<style scoped="scoped">
.tabbar_f{
  width: 100%;
  overflow-x: hidden;
}
</style>
