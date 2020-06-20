<template>
  <div class="artictbody">
  <Navbar></Navbar>
  <div>
    <div class="vid_f">
      <div style="margin:0px;padding:0;position: relative;background:#000;z-index: 10;width: 100%;">
        <video-player  class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
  <!--    <video style="position: relative;" controls="controls" :src="model.spurl">

        您的浏览器不支持 video 标签。</video> -->
 <VBarrage :arr="arr"
      :isPause="isPause"
      :percent="16" style="width: 100%;z-index: 9999;position: absolute;">
      </VBarrage>

       </div>
        <div style="display: flex; max-height:10vw;background-color: #333333;padding: 1vw 0;margin: 0;font-size: 3vw;">
             <input type="text"
                    v-model="sendContent"
                    placeholder="回车支援一条弹幕"
                    @keyup.enter="sendBarrage" style="border-radius: 10px;background-color: #4E555B;border: none; width: 48vw; margin-right: 1.2vw; padding-left: 1.2vw;margin-left: 1.2vw;"/>
             <van-button color="#4E555B" plain @click="isPause=true" size="mini">暂停</van-button>
              <van-button color="#4E555B" plain @click="isPause=false" size="mini">开始</van-button>
               <van-button color="#4E555B" plain @click="arr=[]" size="mini">关闭随机</van-button>
           </div>
       <!--  -->
      <div class="vid_f1">
        <span>{{model.sp_bq}}</span>
        <span>{{model.sp_name}}</span></div>
      <div class="vid_f2">
      <span><van-icon name="coupon" />{{model.datas | formatDate}}</span><span>{{model.sp_gkrs}}次观看</span><span></span>
      </div>
      <div class="vid_f3">
        <span @click="vid_a1='vid_a1'" :class="vid_a1"><van-icon name="good-job" />点赞</span>
        <span @click="userupdata" :class="vid_a2"><van-icon name="records" />收藏</span>
      </div>
    </div>
    <div class="vid_f5">
      <span>猜你喜欢</span>
    </div>
     <div class="vid_f4">
         <Detail class="detaliitem" :detailtem="item" v-for="(item,index) in commendList" :key="index"></Detail>
    </div>
  </div>
    <comments @userplfs="userplfscz" :pllength="userspplList.length"></comments>
    <sendcomments :sppluser="spplitem" v-for="(spplitem,spplindex) in userspplList" :key="spplindex"></sendcomments>
    <div v-if="userspplList.length==0">
      <p style="text-align: center;">急需你的评论支援！！！||ヽ(*￣▽￣*)ノミ|Ю</p>
    </div>
    <van-notify v-model="show" type="success">
      <van-icon name="bell" style="margin-right: 4px;" />
      <span>收藏成功</span>
    </van-notify>
    <van-notify v-model="tshow" type="danger">
      <van-icon name="bell" style="margin-right: 4px;" />
      <span>已经收藏过了</span>
    </van-notify>
  </div>
</template>
<script>
  import sendcomments from '@/components/sendcomments.vue'
  import comments from '@/components/comments.vue'
  import Navbar from '@/components/Navbar.vue'
  import Detail from '@/components/Detail.vue'
  import tabbar from '@/components/tabbar.vue'
  import http from '@/utils/HttpUtil'
  import { formatDate } from '@/utils/date.js'
  import VBarrage from '@/components/VBarrage/index.vue'
export default{
  data () {
    return {
      // 视频播放
                      playerOptions : {
                           playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                             autoplay: false, //如果true,浏览器准备好时开始回放。
                             muted: false, // 默认情况下将会消除任何音频。
                             loop: false, // 导致视频一结束就重新开始。
                             preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                             language: 'zh-CN',
                             aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                             fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                             sources: [{
                               type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                               src: "" //url地址
                             }],
                             poster: "", //你的封面地址
                             // width: document.documentElement.clientWidth, //播放器宽度
                             notSupportedMessage: '', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                             controlBar: {
                               timeDivider: true,
                               durationDisplay: true,
                               remainingTimeDisplay: false,
                               fullscreenToggle: true  //全屏按钮
                             }
                      },


      show:false,
      tshow:false,
      sett:null,
      arr: [],
            isPause: false,
            sendContent: null,
            isJs: false,
            direction: 'default',  //top
            arrif:true,

      user:"",
        model:{
          name:'',
          bt:'',
          datas:'',
          spurl:''
        },
        vid_a1:'',
        vid_a2:'',
        commendList:[],
        userspplList:[],
        actions:{
          selectSpbyId:'blibli/ySp/selectSpById',
          selectSp:'blibli/ySp/selectPageySp',
          selectUserSppl:'blibli/sppl/selectUserSppl',
          addpplUser:'blibli/sppl/addUser',
          selectUserById:'blibli/yUser/selectUserById',
          updateyUser:'blibli/yUser/updateyUser',
          updateyySpid:'blibli/ySp/updateyySpid'
        },
        sp_name:'',
        sp_nx:'',
        page_size:4,
        curr_page:1,
        spsc:''
    }
  },
  components: {
    Navbar,
    Detail,
    tabbar,
    comments,
    sendcomments,
    VBarrage
  },
  methods: {
   async artcleitemata(){
    var j = this.$route.query.id
    await http.xhrPost(this, this.actions.selectSpbyId+"/"+j,null, (res) => {
       this.model=res.data
       this.playerOptions.sources[0].src = 'http://47.115.6.161:8080/upload/'+res.data.sp_url
       this.playerOptions.poster = 'http://47.115.6.161:8080/upload/img/'+res.data.sp_image
       this.model.datas = res.data.sp_date
    })
    },
    async selectspcnxh(){
          let sp_name = this.sp_name;
          let sp_nx = this.sp_nx
          this.selectSp(sp_name,null,0,Math.floor(Math.random()*10+1),4)
        },
      async selectSp (sp_name = null, sp_nx = null, sp_issy=null, curr_page = this.curr_page, page_size = this.page_size) {
          const params = {
            'curr_page': curr_page,
            'page_size': page_size
          }
          if (sp_name !== null && sp_name !== '') {
            params['sp_name'] = sp_name
          }
          if (sp_nx !== null && sp_nx !== '') {
            params['sp_nx'] = sp_nx
          }
           await http.xhrGet(this, this.actions.selectSp, params, (res) => {
              this.commendList=res.data.list
           })
    },
    selectusersppl(){
      var j = this.$route.query.id
      let spid={
       'sp_id': j,
       'curr_page':this.curr_page,
       'page_size':10
     }
      http.xhrGet(this,this.actions.selectUserSppl,spid,(res)=>{
        this.userspplList = res.data.list
      })
    },
   async userplfscz(text){
     if(text!=null&&text!=""){
     if(localStorage.getItem('uid')==null){
        this.$toast.fail('请登录后在试试');
     }else{
     var j = this.$route.query.id
     let plnr={
       'sp_id': j,
       'sppl_text':text,
       'sppl_dz':0
     }
        await http.xhrPost(this,this.actions.addpplUser,plnr,res=>{
          this.$notify({
            message: '评论成功，热度+1',
            color: '#FFFFFF',
            background: '#07c160',
          });
          this.selectusersppl()
        })
        }
        }else{
          this.$toast('请输入评论信息！');
        }
    },
   async userupdata(){
     if(!sessionStorage.getItem('uid')){
        this.$toast.fail('登录后才能收藏┑(￣Д ￣)┍');
    }else{
      if(this.vid_a2!='vid_a2'){
       var j = this.$route.query.id
       var userid=localStorage.getItem('uid')
       let userbyid={
         'user_id':userid
       }
       await http.xhrPost(this,this.actions.selectUserById,userbyid,res=>{
         this.spsc = res.data.usersp_sc
         var spids = this.spsc+","+ j
           let scmessage={
             'user_id':userid,
             'usersp_sc': spids
           }
            http.xhrPost(this,this.actions.updateyUser,scmessage,res=>{
               this.show = true;
                     setTimeout(() => {
                       this.show = false;
                     }, 2000);
               this.vid_a2='vid_a2'
           })
       })
       }else{
           this.tshow = true;
                 setTimeout(() => {
                   this.tshow = false;
            }, 2000);
       }
    }},
     async selectUserId(){
        var j = this.$route.query.id
        var userid=sessionStorage.getItem('uid')
        let id={
          'user_id':userid
        }
         await http.xhrPost(this,this.actions.selectUserById,id,res=>{
             var scif=res.data.usersp_sc.split(",")
             var scleng = scif.length
             for(let i=0;i<scleng;i++){
                if(scif[i]==j){
                  this.vid_a2='vid_a2'
                }
             }
          })
      },

     // 初始化模拟弹幕数据
        initTestData () {
          if(this.arrif){
          let arr = [
            '祝看视频的各位万事如意',
            '心想事成',
            '日进千金'
          ]
          for (let i = 0; i < 6; i++) {
            for (let index = 0; index < 1000; index++) {
              if (index % 2 == 0) {
                this.arr.push({
                  direction: 'top',
                  content: arr[parseInt(Math.random() * arr.length)]
                })
              } else {
                this.arr.push({
                  direction: 'default',
                  content: arr[parseInt(Math.random() * arr.length)]
                })
              }
            }
          }
          }
        },
        // 发送弹幕
        sendBarrage () {
          if (this.arr.length > 1 && this.sendContent != '' && this.sendContent != null) {
            this.arr.unshift({
              content: this.sendContent,
              direction: this.direction,
              isSelf: true,
              style: {
                color: 'red',
                fontSize: '18px'
              },
              isJs: this.isJs
            });
          } else {
            this.arr.push({
              content: this.sendContent,
              direction: this.direction,
              isSelf: true,
              style: {
                color: 'red'
              },
              isJs: this.isJs
            });
          }
          this.sendContent = null;
        },
        async updateyySpid(gkrs){
                let userbyid={
                  sp_id:this.$route.query.id,
                  sp_gkrs:gkrs
                }
                await http.xhrPost(this,this.actions.updateyySpid,userbyid,res=>{
                  console.log(res)
              })

        }

  },
  mounted() {
    this.initTestData()
      this.selectUserId()
     this.sett=setTimeout(()=>{
      var gkrs=this.model.sp_gkrs
      gkrs++
      this.updateyySpid(gkrs)
    },10000)

  },
  beforeDestroy() {
      clearInterval(this.sett);
      this.sett = null;
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy.MM.dd');
    }
  },
  created() {
    this.artcleitemata()
    this.selectspcnxh()
    this.selectusersppl()
   if(localStorage.getItem('uid')!=null&&localStorage.getItem('uid')!=""){
     //this.selectUserbyId()
   }
  }
}
</script>

<style scoped="scoped">
  .artictbody{
    overflow-x: hidden;
    background-color: white;
    padding-bottom: 50px;
  }
  .vid_f{
    padding: 0 2vw;
  }
  .vid_f video{
    width: 100%;
  }
  .vid_f1{
    padding: 1vw 0;
  }
  .vid_f1 span:nth-child(1){
    color: #FB7299;
    padding: 0 2vw;
    background-color: #F2DEDE;
    border-radius: 2vw;
  }
  .vid_f2{
    display: flex;
    padding: 1vw 0;
  }
  .vid_f2 span:nth-child(1){
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #999999;
    margin-right: 10vw;
  }
  .vid_f2 span:nth-child(2){
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #999999;
    margin-right: 8vw;
  }
  .vid_f3{
    display: flex;
    padding: 2vw 0;
  }
  .vid_f3 span:nth-child(1){
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #004444;
    margin-right: 10vw;
  }
  .vid_f3 span:nth-child(2){
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #004444;
    margin-right: 8vw;
  }
/*  .vid_f3 span:nth-child(2):active{
    color: yellow;
  } */
  .vid_a1,.vid_a2{
    color: coral!important;
  }
  .detaliitem{
      width:49%;
      height: 43vw;
  }
  .vid_f4 {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 1vw;
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
