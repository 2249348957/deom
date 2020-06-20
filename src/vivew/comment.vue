<template>
  <div style="padding-bottom: 50px;">
  <div style="padding: 0 5px;">
    <div class="comment_top">
      <img src="../assets/bj1.jpg" alt=""/>
      <img src="../assets/add1.png" class="comment_top1" @click="kjpkadd"/>
      <div class="comment_f">
     <van-image
      v-if="userimg"
        round
        width="5rem"
        height="5rem"
        :src="'http://47.115.6.161:8080/resource/img/'+userimg"
      />
      <van-image
        v-else
        round
        width="5rem"
        height="5rem"
        :src="image"
       />
      <div class="comment_f2">
      <p class="comment_f1">&nbsp;<span>今日访客</span>666</p>
      <p class="comment_f1">&nbsp;<span>访客总量</span>9999</p>
      </div>
      </div>
    </div>
      <div class="comment_f3">
        <van-grid>
          <van-grid-item icon="photo-o" text="相册" to="/images"/>
          <van-grid-item icon="music-o" text="音乐" dot clickable to="/musicmmain"/>
          <van-grid-item icon="photo-o" text="正在开发"/>
          <van-grid-item icon="photo-o" text="正在开发"/>
        </van-grid>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        ref="check"
      >
      <have class="van-clearfix" v-for="(item,index) in userkjplLists" :key="index" :userkjpllist="item" @dz="dzsx"></have>
      </van-list>
    </div>
  </div>
</template>
<script>
  import tabbar from '@/components/tabbar.vue'
  import have from '@/components/have.vue'
  import http from '@/utils/HttpUtil'
export default{
  data () {
    return {
      image:require('../assets/tx1.jpg'),
      action:{
        selectuserkjpl:'blibli/kjpl/selectPageUserKjpl',
        selectUserById:'blibli/yUser/selectUserById',
        selectPageUserPl:'blibli/kjpl/selectPageUserPl'
      },
      kjpl_text:null,
      userkjplList:[],
      userkjplLists:[],
      userimg:"",
      curr_page:1,
      page_size:10,
      loading: false,
      finished: false,
      kjplid:0
    }
  },
  components: {
    have,
    tabbar
  },
  methods: {
    selectuserkjpluser(){
      var kjpl_textd = this.kjpl_text
      this.selectuserkjpllist(kjpl_textd,this.curr_page,this.page_size)
    },
  async selectuserkjpllist (kjpl_text = null, curr_page = this.curr_page, page_size = this.page_size) {
        const params = {
          'curr_page': curr_page,
          'page_size': page_size
        }
        if (kjpl_text !== null && kjpl_text !== '') {
          params['kjpl_text'] = kjpl_text
        }
         await http.xhrGet(this, this.action.selectuserkjpl, params, (res) => {
            var d = res.data.list
              if(d[0].kjpl_id===this.kjplid){
                this.finished = true;
              }
              var listkjpl = d.map((item)=>{        //改造数组结构
                item.imglist = []
                return item
              })
               for(var i=0;i<listkjpl.length;i++){
                 if(listkjpl[i].kjpl_img!=""&&listkjpl[i].kjpl_img!=null){
                   var li=listkjpl[i].kjpl_img.split(",")
                   listkjpl[i].imglist.push(li)
                 }
               }
                 var list=listkjpl.map((item)=>{
                   this.userkjplLists.push(item)
                   return this.userkjplLists
                 })
                  this.kjplid=d[0].kjpl_id
                  this.loading = false;
                  if (listkjpl.length < 10) {
                       this.finished = true;
                    }
         })
  },
  kjpkadd(){
    this.$router.push({path: "/addss"})
  },
  //  //查询个人信息
  selectUser(){
    var id = localStorage.getItem('uid')
    let params={
   'user_id': id
   }
     http.xhrPost(this, this.action.selectUserById, params, (res) => {
      this.userimg = res.data.user_image;
   })},
    onLoad() {
         // 异步更新数据
         // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        let timer = setTimeout(() => {
          this.curr_page++
          this.selectuserkjpllist(null,this.curr_page,this.page_size)
            this.finished && clearTimeout(timer)
           // 加载状态结束
         }, 1000);
       },
    dzsx(){
      this.curr_page=1
      this.userkjplLists=[]
      this.loading = true;
      this.finished = false;
      this.selectuserkjpluser()
    }
  },
  created() {
    this.selectuserkjpluser()
    if(localStorage.getItem('uid')!=null&&localStorage.getItem('uid')!=""&&sessionStorage.getItem("uid")!=""){
     this.selectUser()
    }
  },
  activated(){
    if(localStorage.getItem('uid')!=null&&localStorage.getItem('uid')!=""&&sessionStorage.getItem("uid")!=""){
    this.selectUser()
    }else{
      this.userimg=""
    }

   if(sessionStorage.getItem("userup")!=null){
     this.curr_page=1
     this.userkjplLists=[]
     this.loading = true;
     this.finished = false;
     this.selectuserkjpluser()
     sessionStorage.removeItem('userup');
   }
  },
  watch:{
     $route (to, from) {
           if(from.fullPath=="/addss"){
              this.curr_page=1
              this.userkjplLists=[]
              this.loading = true;
              this.finished = false;
              this.selectuserkjpluser()
    　　}
    }
  }
}
</script>

<style scoped="scoped">
  .comment_top1{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10vw!important;
    height: 10vw!important;
  }
  .comment_top{
    position: relative;
    width: 100%;
    min-height: 65vw;
    overflow: hidden;
  }
  .comment_top img{
    width: 100%;
    height: 70vw;
    position: absolute;
  }
  .comment_f{
     display: flex;
     justify-content: space-between;
     position: relative;
     top: 36vw;
     left: 10vw;
     padding-right: 13vw;
  }
  .comment_f1{
    display: flex;justify-content: space-between; align-items: center;width: 30vw; color: white;font-size: 3.5vw;
    margin: 1vw 0;
  }
  .comment_f2{
    display: flex;
    flex-direction: column-reverse;
  }
  .comment_f3{
    width: 100%;
    min-height: 50px;
    background-color: white;
    border-bottom: 1px solid #808080;
  }
  .van-grid-item .van-grid-item__content{
    padding: 10px 8px!important;
  }
  .van-hairline{
    padding: 10px 8px!important;
  }
</style>
