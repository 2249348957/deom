<template>
  <div style="width: 100%;height: 9vh;display: flex; align-items: center;">
   <div @click="ht" style="width: 15vw;height: 100%;align-items: center; display: flex;justify-content: center;"><van-icon color="#FFF" size="medium" name="arrow-left" /></div>
    <div>
      <p style="font-size: 4.5vw;color: #FFFFFF; font-weight: bold;" v-if="musicname.name">{{musicname.name}}</p>
      <p style="color: #999999;" v-if="musicname.grname">{{musicname.grname}}</p>
    </div>
  </div>
</template>
<script>
export default{
  props:['musicname'],
  data () {
    return {
      name:""
    }
  },
  components: {

  },
  methods: {
    fun(){
    this.$store.commit('yybfqif')
    },
    ht(){
      this.$store.commit('yybfqif')
    }
  },
  mounted(){
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.fun, false);//false阻止默认事件
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
  }
}
</script>

<style scoped="scoped">

</style>

