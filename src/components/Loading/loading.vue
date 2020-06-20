<template>
        <div class="loading">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
</template>
<script>
export default{
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped="scoped">
  .loading{
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background-color:whitesmoke;
  }
</style>
