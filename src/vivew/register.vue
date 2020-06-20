<template>
  <div>
   <logintop middleTop="注册blibli">
     <div slot="right" @click="$router.push('/login')" style="font-size: 3vw;">切换到登录</div>
   </logintop>
   <logintext label="姓名" style="margin-bottom: 3.3vw;" placeholder="请输入姓名" @tttt="res => model.name = res"></logintext>
   <logintext label="账号" placeholder="请输入账户" rule="^1[3|4|5|8][0-9]\d{4,8}$" @tttt="res => model.account = res"></logintext>
   <logintext label="密码" placeholder="请输入密码" rule="^.{6,16}$" type="password" @tttt="res => model.password = res"></logintext>
   <loginbtn btntext="注册" @registerSubmit = "registerSubmit"></loginbtn>
  </div>
</template>
<script>
 import loginbtn from '@/components/LoginBtn.vue'
 import logintop from '@/components/LoginTop.vue'
 import logintext from '@/components/LoginText.vue'
 import http from '@/utils/HttpUtil'
export default{
  data () {
    return {
      model:{
        name:'',
        account:'',
        password: ''
    },
    action:{
      register:'blibli/yUser/addUser'

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
       let rulg = new RegExp("^.{6,16}$")
       const sjh = /^[1][3,4,5,7,8,9][0-9]{9}$/
        if(sjh.test(this.model.account)&&rulg.test(this.model.password)){
          const log = {
            'user_name':this.model.name,
            'user_account':this.model.account,
            'user_password':this.model.password
          }
         await http.xhrPost(this, this.action.register, log, (res) => {
          this.$toast.success(res.message);
          if(res.resultCode == 0){
            setTimeout(()=>{
              this.$router.push('/Login')
            },1000)
          }
          })
        }else {
          this.$toast.fail('请重新输入手机号,或者密码长度大于5位数');
        }
      }
  },
  mounted() {

  }
}
</script>

<style>
</style>
