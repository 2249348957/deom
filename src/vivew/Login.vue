<template>
  <div>
   <logintop middleTop="登录blibli">
     <div slot="right" @click="$router.push('/register')" style="font-size: 3vw">切换到注册</div>
   </logintop>
   <logintext label="账号" placeholder="请输入账户" rule="^.{6,16}$" @tttt="res => model.account = res" style="margin-bottom: 3vw;"></logintext>
   <logintext label="密码" placeholder="请输入密码" rule="^.{6,16}$" type="password" @tttt="res => model.password = res"></logintext>
   <loginbtn btntext="登录" @registerSubmit = "registerSubmit"></loginbtn>
  </div>
</template>
<script>
 import loginbtn from '@/components/LoginBtn.vue'
 import logintop from '@/components/LoginTop.vue'
 import logintext from '@/components/LoginText.vue'
 import http from '@/utils/HttpUtil'
 import axios from 'axios'
export default{
  data () {
    return {
      model:{
        account:'',
        password: ''
    },
    action:{
      login:'blibli/yUser/login'

    }}
  },
  components: {
    logintop,
    logintext,
    loginbtn
  },
  watch:{

  },
  methods: {
     async registerSubmit(){
       let rulg = new RegExp("^.{4,16}$")
        if(rulg.test(this.model.account)&&rulg.test(this.model.password)){
          var params = new URLSearchParams();
            params.append('account', this.model.account);
            params.append('password', this.model.password);
         await axios.post(this.action.login, params).then(res=>{
         this.$toast.success(res.data.message);
         if(res.data.resultCode === 0){
           localStorage.setItem('token',JSON.stringify(res.data.data))
           localStorage.setItem('uid',JSON.stringify(res.data.data.user_id))
           sessionStorage.setItem("uid",JSON.stringify(res.data.data.user_id))
           setTimeout(()=>{
             this.$router.push('/userinfo')
           },1000)
         }})
        }else {
          this.$toast.fail('格式不正确，请重新输入');
        }
      }
  },
  mounted() {

  }
}
</script>

<style>
</style>
