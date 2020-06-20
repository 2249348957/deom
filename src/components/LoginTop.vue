<template>
  <div>
    <div class="LoginTop">
      <div></div>
      <div>{{middleTop}}</div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  props:["middleTop"],
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
.LoginTop {
  height: 50px;
  background-color: white;
  display: flex;
  margin-bottom: 15px;
}
div {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 5vw;
}
</style>
