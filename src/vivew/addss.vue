<template>
  <div>
    <div class="ss_f1">
      <div class="ss_f2"><span @click="qux">取消</span></div>
      <div><van-tabs v-model="activeName" line-width="10vw">
        <van-tab title="说说" name="a"></van-tab>
      </van-tabs>
      </div>
      <div><van-button round type="info" size="mini" v-if="fb" @click="kjpladd">发表</van-button>
           <van-button round disabled type="info" size="mini" v-else>发表</van-button>
      </div>
    </div>
    <div class="ss_f3">
     <van-cell-group>
       <van-field
         v-model="message"
         rows="2"
         label=""
         type="textarea"
         maxlength="300"
         placeholder="分享此时此刻..."
         show-word-limit
         clearable
         autosize
       />
     </van-cell-group>
    </div>
    <div class="ss_f4">
      <van-uploader v-model="fileList" :deletable="false" :before-delete="deleteimg" multiple :max-count="4" :max-size="5 * 1024 * 1024" :before-read="beforeRead"  :after-read="afterRead" upload-text="请上传图片"/>
    </div>
    <div class="ss_f5">
     <van-dropdown-menu>
       <van-dropdown-item v-model="value1" :options="option1" />
     </van-dropdown-menu>
    </div>
  </div>
</template>
<script>
   import http from '@/utils/HttpUtil'
   import axios from 'axios'
export default{
  inject:['reload'],
  data () {
    return {
      activeName:'说说',
      value1:"对所有人可见",
      option1: [
              { text: '仅对你可见', value: "仅对你可见" },
              { text: '对所有人可见', value: "对所有人可见" }
            ],
      action:{
              adduserkjpl:'blibli/kjpl/addKjpl',
              filekjpl:'blibli/wjsc/filekjpl'
            },
            items: require('../assets/add2.png'),
      fb:false,
      message:'',
      fileList:[],
      imgList:""
}
  },
  components: {

  },
  methods: {
    deleteimg(e){},   //图片删除的回调函数
     // 返回布尔值  //图片上传校验
        beforeRead(file) {
          if (file.type !== 'image/jpeg') {
            this.$toast.success('请上传 jpg 格式图片');
            return false;
          }
          return true;
        },
         async afterRead(file,detail){           //图片上传
         console.log(detail)
          var myform = new FormData();
          myform.append('file',file.file);
         await axios.post(this.action.filekjpl,myform,{
           headers:{"content-type":"multer/form-date"}
         }).then(res=>{
           this.imgList+=res.data+","
         })
           },
            qux(){
              this.$router.push({path: "/comment"})
            },
           kjpladd(){
             var imagekjpl=this.imgList.substr(0,this.imgList.length-1)
             let params={
              'kjpl_text':this.message,
              'kjpl_zt':this.value1,
              'kjpl_img':imagekjpl
             }
             if(!sessionStorage.getItem('uid')){
               this.$toast.fail('请登录后在试');
             }else{
               http.xhrPost(this, this.action.adduserkjpl, params, (res) => {
                  this.$toast({
                   message: '发送成功',
                   icon: this.items
                 });
                   this.message = "";
                   setTimeout(()=>{
                    this.$router.push({path: "/comment"})
                   },1000)
               })
             }
}
  },
  created() {
  },
  watch:{
    message(text){
      if(text==""){
        this.fb = false
      }else{
        this.fb = true
      }
    }
  }
}
</script>

<style scoped="scoped">
.ss_f1{
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  width: 100%;
}
div{
}
.ss_f3{
  width: 100%;
  height: 200px;
  background-color: white;
  border: none;
}
.ss_f4{
  padding-left: 10px;
background-color: white;
}
.ss_f5{
  width: 100%;
  height: 30px;
  background-color: white;
}
</style>
