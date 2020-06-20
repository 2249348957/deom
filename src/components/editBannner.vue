<template>
  <div>
    <div @click="bannerClick" class="editBannner">
      <span>{{letf}}</span>
      <span><slot name="rigth"></slot></span>
    </div>
  </div>
</template>
<script>
export default{
  props:['letf'],
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    bannerClick(){
      this.$emit('bannerClick')
    }
  }
}
</script>

<style scoped="scoped">
  .editBannner {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    font-size: 3.5vw;
    background-color: white;
    border-bottom: 2px solid #fafafa;
    align-items: center;
    font-weight: 600;
  }
</style>
