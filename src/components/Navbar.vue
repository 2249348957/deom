<template>
  <div class="navbar">
      <div class="logo"><img src="../assets/bliblilogo.jpg" alt="" @click="$router.push('/')"/></div>
  <div>
    <p>
      <i><van-icon name="search" /></i>
      <input v-model="sptexts" type="text" placeholder="请输入" @input="sptext"/>
    </p>
  </div>
  <div class="inputnav">
  <img :src="'http://47.115.6.161:8080/resource/img/'+tximg" alt="" @click="$router.push('/edit')" v-if="tximg"/>
  <img src="../assets/tx1.jpg" alt="" @click="$router.push('/edit')" v-else/>
  <p class="inputnav-p">下载app</p>
  </div>
  </div>
</template>
<script>
export default{
    props:['tximg'],
  data () {
    return {
      sptexts:'',
      image:''
    }
  },
  components: {

  },
  methods: {
  sptext(){
    this.$emit("spinpt",this.sptexts)
  }
  },
  mounted() {
    // const res = await this.$http.get('/user/'+localStorage.getItem('id'))
    // this.image = res.data[0].user_img
  }
}
</script>

<style scoped="scoped">
.navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;
}
.logo {
  display: flex;
  align-items: center;
}
.logo img {
  margin-left: 3vw;
  height: 18vw;
}
div:nth-child(1){
  flex: 0.8;
}
div:nth-child(2){
  display: flex;
  justify-content: center;
  align-items: center;
}
div:nth-child(2) p{
  display: flex;
  align-items: center;
  width: 35vw;
  line-height: 6vw;
  background-color: #F4F4F4;
  border-radius: 10px;
}
div:nth-child(2) p i {
  padding-top: 0.6vw;
  margin-left: 1vw;
  margin-right: 1vw;
}
div:nth-child(2) p input{
  font-size: 10px;
  border: none;
  background-color: rgba(0,0,0,0);
  width: calc(100% - 50px);
}
.inputnav{
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputnav .inputnav-p{
  padding: 1vw 0;
  display: flex;
  width: 17vw;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  font-size: 3.5vw;
  background-color: #fb7299;
  border-radius: 10px;
  color: white;
}
.inputnav img {
  height: 8vw;
  width: 8vw;
  margin: 0 2vw;
  border: 1px solid #FFF1F0;
  border-radius: 30px;
}
</style>
