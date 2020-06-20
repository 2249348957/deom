<template>
  <div class="fspl_f0">
    <div class="fspl_f1">
      <img v-if="sppluser.user_image!=''" :src="'http://47.115.6.161:8080/resource/img/'+sppluser.user_image" />
      <img v-else src="../assets/tx1.jpg" alt=""/>
      <div class="fspl_f2">
        <p v-if="sppluser.user_name"><span>{{sppluser.user_name}}</span><span style="float: right;">{{sppluser.sppl_date | formatDate}}</span></p>
        <p v-else><span>此用户不留名！</span><span>XX-XX</span></p>
        <p>{{sppluser.sppl_text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '@/utils/date.js'
export default{
  props:['sppluser'],
  data () {
    return {

    }
  },
  components: {

  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      console.log(date)
      return formatDate(date, 'MM.dd');
    }
  },
  methods: {

  }
}
</script>

<style scoped="scoped">
  .fspl_f0{
    padding: 10px 0;
    border-bottom:1px solid #f0f0f0;
  }
 .fspl_f1{
    width: 100%;
    display: flex;
  }
  .fspl_f1 img {
    margin-left: 5px;
    width: 9vw;
    height: 9vw;
    border: #b7b8ba solid 1px;
    border-radius: 5vw;
  }
  .fspl_f2{
    width: 100%;
    margin-left: 10px;
    font-family: "宋体";
  }
  .fspl_f2 p{
    font-size: 3.4vw;
  }
  .fspl_f2 p:nth-child(1){
    margin-bottom: 3px;
    color: #818181;
  }
  .fspl_f2 p span:nth-child(2){
    margin-right: 5px;
  }
</style>
