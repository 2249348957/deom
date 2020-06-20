<template>
  <div>
  <div class="commenttop_f1">
    <p>评论&nbsp;<span>({{pllength}})</span></p>
  </div>
  <div class="commentbody_f1">
    <div class="commentbody_f2"><img src="../assets/tx1.jpg" alt=""/></div>
    <div class="commentbody_f3"><input type="text" v-model="pltext" placeholder="说点什么吧">
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" round size="mini" @click="fspl">发送</van-button>
    </div>
  </div>
  </div>
</template>
<script>
export default{
  props:['pllength'],
  data () {
    return {
      pltext:""
    }
  },
  components: {

  },
  methods: {
    fspl(){
      this.$emit("userplfs",this.pltext)
      this.pltext=""
    }
  }
}
</script>

<style scoped="scoped">
 .commenttop_f1{
  width: 100%;
  padding: 5px 0;
  }
.commenttop_f1 p {
  font-size: 4vw;
  padding: 5px;
}
.commenttop_f1 p span{
  color: #b3b3b3;
}
.commentbody_f1{
  display: flex;
  align-content: center;
  padding: 0 5px;
}
.commentbody_f2 img{
 width: 8vw;
 height: 8vw;
 border-radius: 4vw;
}
.commentbody_f3 input{
  margin-left: 4vw;
  width: 63vw;
  border: none;
  height: 7vw;
  color: #686868;
  padding: 1px 10px;
  border-radius: 3vw;
  line-height: 7vw;
  background-color: #f4f4f4;
  font-size: 3.7vw;
}
</style>
