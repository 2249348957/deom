<template>
  <div style="overflow-x: hidden;padding-bottom: 50px;width: 100%;">
  <Navbar :tximg="user.user_image"></Navbar>
  <userComponet :users="user"></userComponet>
  <div class="vid_f5">
    <span>我的收藏</span>
  </div>
  <div>
  <div class="det_t" v-if="commendList.length!=0">
  <Detail class="detaliitem" :detailtem="item" v-for="(item,index) in commendList" :key="index"></Detail>
  </div>
  <div v-else>
    <p>你还未收藏视频</p>
  </div>
  </div>
  </div>
</template>
<script>
 import Navbar from '@/components/Navbar.vue'
 import userComponet from '@/components/userComponet/userComponet.vue'
 import Detail from '@/components/Detail.vue'
 import http from '@/utils/HttpUtil'
 import axios from 'axios'
export default{
  data () {
    return {
      model:[],
      commendList:[],
      sp_name:'',
      sp_nx:'',
      spscts:'',
      actions:{
        selectSpbyId:'blibli/ySp/selectSpById',
        selectSp:'blibli/ySp/selectPageySp',
        selectUserById:'blibli/yUser/selectUserById',
        selectPageySpID:'blibli/ySp/selectPageySpID'
      },
      user:{
        name:'',
        gxqm:'',
        user_image:'',
        usersp_sc:'',
        spsc_ts:''
      }
    }
  },
  components: {
    Navbar,
    userComponet,
    Detail
  },
  methods: {
    selectuserid(){
      var ids = this.user.usersp_sc
      axios.post(this.actions.selectPageySpID+"/"+ids,{
        headers:{"content-type":"multer/form-date"}
      }).then(res=>{
        this.commendList=res.data.data
    })},
   //  //查询个人信息
   selectUser(){
     var id = localStorage.getItem('uid')
     let params={
    'user_id': id
    }
      http.xhrPost(this, this.actions.selectUserById, params, (res) => {
       this.user.name = res.data.user_name;
       this.user.gxqm = res.data.user_gxqm;
       this.user.user_image = res.data.user_image;
       this.user.usersp_sc = res.data.usersp_sc
       var scsm = ""
       if(res.data.usersp_sc.slice(0,1)==","){
        scsm = res.data.usersp_sc.slice(1)
       }else if(res.data.usersp_sc.slice(0,1)=="n"){
        scsm = res.data.usersp_sc.slice(5)
       }else{
        scsm = res.data.usersp_sc
       }
        var scs = new Set(scsm.split(","))
      // console.log(scs)
        this.user.spsc_ts = scs.size
       this.selectuserid()
    })},
  },
  created() {       //页面创建完成时
      this.selectUser()

    // this.UserinfoData()
    // this.commendData()
    //this.selectspcnxh()

  },
  activated() {
  this.selectUser()
  },
  mounted() {

  }
}
</script>

<style scoped="scoped">
  .detaliitem{
      width:48%;
      height: 43vw;
      margin: 5px 0;
  }
  .det_t{
    display: flex;
    flex-wrap: wrap;
    padding: 0 1vw;
    overflow: hidden;
    justify-content: space-between;
  }
  .vid_f5{
    display: flex;
    margin: 5px 0;
    padding: 1vw 1vw;
    width: 96%;
    border-radius: 10px;
    border: 2px solid #F1B0B7;
  }
  .vid_f5 span{
    font-size: 5vw;
  }
</style>
