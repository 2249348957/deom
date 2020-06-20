<template>
  <div>
    <div class="loginbtn" @click="registerClick">
    <van-button block color="linear-gradient(to right, #4bb0ff, #6149f6)">{{btntext}}</van-button>
    </div>
  </div>
</template>
<script>

export default{
  props:["btntext"],
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    registerClick(){
      this.$emit('registerSubmit')
    }
  }
}
</script>

<style>
  .loginbtn {
    display: flex;
    flex: 1;
    margin-top: 15px;
    height: 47px;
    padding: 0 3vw;
  }
</style>
