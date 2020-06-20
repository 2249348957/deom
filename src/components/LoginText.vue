<template>
  <div>
    <div class="">
        <!-- 输入任意文本 -->
        <van-field v-model="text" :label="label" :type="type" :placeholder="placeholder" :rule="rule"/>
    </div>
  </div>
</template>
<script>
export default{
  props:['label','type','placeholder','rule'],
  data () {
    return {
      text:''
    }
  },
  watch: {
    text(){
      this.rultText()
    }
  },
  components: {

  },
  methods: {
    rultText(){
        const res = new RegExp(this.rule)
        // if (res.test(this.text)) {
          this.$emit('tttt',this.text)
        // }
    }
  },
  created() {
    this.rultText()
  }
}
</script>

<style>
</style>
