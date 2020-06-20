<template>
  <div class="edotViews">
    <Navbar :tximg="letfname.image"></Navbar>
    <div class="uploadimg">
     <van-uploader preview-size="50vw" :after-read="afterRead" class="uplo"/>   <!-- 头像上传 -->
     </div>
    <editBannner letf="头像">
      <img :src="'http://47.115.6.161:8080/resource/img/'+letfname.image" alt="" slot="rigth" class="img1" v-if="letfname.image"/>
      <img src="../assets/tx1.jpg" alt="" slot="rigth" class="img1" v-else/>
    </editBannner>
    <editBannner letf="名称" @bannerClick="name = true">
      <a href="javasrcipt:;" slot="rigth" >{{letfname.name}}</a>
    </editBannner>
    <editBannner letf="ID">
      <a href="javasrcipt:;" slot="rigth">001</a>
    </editBannner>
    <editBannner letf="性别" @bannerClick="sex = true">
      <a href="javasrcipt:;" slot="rigth">{{sexs[letfname.sex]}}</a>
    </editBannner>
    <editBannner letf="出生日期">
      <a href="javasrcipt:;" slot="rigth">20200808</a>
    </editBannner>
    <editBannner letf="个性签名" @bannerClick="gxqm = true">
      <a href="javasrcipt:;" slot="rigth">{{letfname.gxqm}}</a>
    </editBannner>
    <van-dialog v-model="name" title="请输入名称" show-cancel-button v-on:confirm="confirclick">
        <van-cell-group>
          <van-field v-model="userinfo.name" placeholder="请输入用户名" />
        </van-cell-group>
    </van-dialog>

    <van-dialog v-model="gxqm" title="请输入个性签名" show-cancel-button v-on:confirm="gxqmclick">
        <van-cell-group>
          <van-field v-model="userinfo.gxqm" placeholder="请输入个性签名" />
        </van-cell-group>
    </van-dialog>

    <van-action-sheet v-model="sex" :actions="actions" @select="onSelect" />

    <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>
    <div class="editback" @click="tclogin">退出登录</div>
  </div>

</template>
<script>
  import http from '@/utils/HttpUtil'
  import Navbar from '@/components/Navbar.vue'
  import editBannner from '@/components/editBannner.vue'
  import axios from 'axios'
export default{
  data () {
    return {
        letfname:{
          name: '小米',
          image: '',
          sex:0,
          gxqm:'。。。。。'
        },
        sexs:['男','女'],
         fileList: [],
         name:false,
         gxqm:false,
         sex:false,
        userinfo:{
          name: '',
          image: '',
          sex:0,
          gxqm:''
        },
        act:{
          selectUserById:'blibli/yUser/selectUserById',
          zxlogin:'/blibli/yUser/zxlogin',
          updateyUser:'blibli/yUser/updateyUser',
          fileupload:'blibli/wjsc/fileupload'
        },
         actions: [
                { name: '男',value:0 },
                { name: '女',value:1 }
              ],
    }
  },
  components: {
    Navbar,
    editBannner
  },
  created() {
    this.selectUser()
  },
  methods: {
   selectUser(){
     var id = localStorage.getItem('uid')
     let params={
    'user_id': id
    }
      http.xhrPost(this, this.act.selectUserById, params, (res) => {
       this.letfname.name = res.data.user_name;
       this.letfname.sex =res.data.user_sex;
       this.letfname.gxqm = res.data.user_gxqm;
       this.letfname.image = res.data.user_image;
    })},
   async afterRead(file){    //头像上传
   var myform = new FormData();
   myform.append('file',file.file);
   axios.post(this.act.fileupload,myform,{
    headers:{"content-type":"multer/form-date"}
  }).then(res=>{
    var img = res.data
    var id = localStorage.getItem('uid')
    let params={
    'user_id': id,
    'user_image': img
    }
     http.xhrPost(this, this.act.updateyUser, params, (res) => {
          sessionStorage.setItem("userup",0)
          this.selectUser()
     })
  })
    },
    confirclick(){
      var id = localStorage.getItem('uid')
      let params={
      'user_id': id,
      'user_name': this.userinfo.name
      }
       http.xhrPost(this, this.act.updateyUser, params, (res) => {
         sessionStorage.setItem("userup",0)
            this.selectUser()
       })
    },
    gxqmclick(){
      var id = localStorage.getItem('uid')
      let params={
      'user_id': id,
      'user_gxqm': this.userinfo.gxqm
      }
       http.xhrPost(this, this.act.updateyUser, params, (res) => {
            this.selectUser()
       })
    },
    onSelect(item){     //修改性别
    var id = localStorage.getItem('uid')
    let params={
    'user_id': id,
    'user_sex': item.value
    }
     http.xhrPost(this, this.act.updateyUser, params, (res) => {
          this.selectUser()
     })
        this.sex = false
    },
    async userUpdata(){
      const res = await this.$http.post('/update/'+ localStorage.getItem('id'))
    },
    tclogin(){    //退出登录，清空token
        http.xhrGet(this, this.act.zxlogin, null, (res) => {
           localStorage.clear();
           sessionStorage.clear();
          this.$router.push('Login')
        })
    }
    }
}
</script>

<style scoped="scoped">
  .edotViews{
    width: 100%;
   overflow-x: hidden;
  }
  .edotViews a{
    text-decoration: none;
    color:  #999999;
  }
  .img1{
    width: 30px;
    max-height: 30px;
  }
  .uploadimg{
    height: 63px;
    opacity: 0;
    right: 0;
    position: absolute;
      overflow: hidden;
  }
  .uplo{
    margin-left: 0px;
  }
  .editback{
    width: 100%;
    padding: 15px 0;
    background-color: white;
    margin-top: 10px;
    font-size: 3.6vw;
    align-items: center;
    justify-content: center;
    display: flex;
  }
</style>
