<template>
  <div class="userdetali">
      <div class="user_a">
        <img v-if="users.user_image" :src="'http://47.115.6.161:8080/resource/img/'+users.user_image" alt="">
        <img v-else src="../../assets/tx1.jpg" alt="">
      <div class="user_edit">
        <div class="user_f">
          <div class="user_f1">
          <p>6</p>
          <p>粉丝</p>
          </div>
         <div class="user_f1 bor">
         <p>6 </p>
         <p>关注</p>
         </div>
         <div class="user_f1 bor">
         <p v-if="users.spsc_ts">{{users.spsc_ts}}</p>
         <p v-else>0</p>
         <p>收藏</p>
         </div>
        </div>
        <div class="userbat1">
            <van-button plain type="danger" block size="small" @click="$router.push('/edit')">编辑资料</van-button>
        </div>
      </div>
      </div>
      <div class="user_f3">
        <p v-if="users.name">{{users.name}}</p>
        <p v-else>萌新</p>
        <p v-if="users.gxqm">{{users.gxqm}}</p>
        <p v-else>这个人很朗，什么都没有写（︶^︶）</p>
      </div>
  </div>
</template>
<script>
export default{
  props:['users'],
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
  .userdetali {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 0 12px;
  }
  .user_a {
     display: flex;
  }
   .userdetali img {
     width: 20vw;
     height: 20vw;
     overflow: hidden;
     border-radius: 50px;
     border: 1px solid #000000;
   }
   .user_edit {
     display: flex;
     flex-direction: column;
   }
   .user_f {
     height: 40px;
     margin-left: 50px;
     display: flex;
     flex-direction: row;
   }
   .user_f1 p{
     display: flex;
     justify-content: center;
      margin: 0 18px;
      font-size: 14px;
   }
   .user_f1 p:nth-child(2){
     color: #6C757D;
     font-size: 12px;
   }
   .userbat1 {
    display: flex;
    width: 50vw;
    height: 7vw;
    margin-left: 12vw;
    justify-content: center;
   }
   .bor {}
   .user_f3 {
     margin-bottom: 10px;
   }
   .user_f3 p{
     font-size: 5vw;
     font-weight: 600;
     margin: 15px 0;
   }
   .user_f3 p:nth-child(2){
     font-size: 4vw;
     color: #686868;
     margin: 0;

   }
</style>
