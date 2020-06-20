<template>
  <div>
    <Navbar :tximg="userimage" @spinpt="sptext"></Navbar>
     <van-tabs v-model="Catid" swipeable>
       <van-tab v-for="(item,index) in lists" :name="item.splx" :key="index" :title="item.splx">
          <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="onLoad"
           :immediate-check="false"
          >
    <div class="detailparent">
          <Detail class="detaliitem" :detailtem="catitme" v-for="(catitme,catindex) in spList" :key="catindex"></Detail>
    </div>
          </van-list>

      </van-tab>
     </van-tabs>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue'
  import Detail from '@/components/Detail.vue'
  import tabbar from '@/components/tabbar.vue'
  import http from '@/utils/HttpUtil'
  import axios from 'axios'
export default{
  data () {
    return {
      userimage:'',
      pagesize:'',
      active:[],
      spList:[],
      lists:[{id:0,splx:"首页"},
             {id:1,splx:"沙雕新闻"},
             {id:2,splx:"搞笑"},
             {id:3,splx:"音乐"},
             {id:4,splx:"娱乐"},
             {id:5,splx:"推荐"},
             {id:6,splx:"常用技巧"},
             {id:7,splx:"街头趣事"}],
      Catid:"首页",
      sp:{
        sp_name:null,
        sp_nx:null,
        sp_issy:null
      },
      loading: false,
      finished: false,
      page_size: 10,
      curr_page: 1,
      action:{
        selectSp:'blibli/ySp/selectPageySp',
        selectUserById:'blibli/yUser/selectUserById'
      },
      starttime: null
    }
  },
  components: {
    Navbar,
    Detail,
    tabbar
  },
  methods: {
    selectSpxx(){
      let sp_name = this.sp.sp_name;
      let sp_nx = this.Catid
      let sp_issy = this.sp.sp_issy
      this.selectSp(sp_name,sp_nx,null,this.curr_page,this.page_size)
    },
   selectSp (sp_name = null, sp_nx = null, sp_issy=null, curr_page = this.curr_page, page_size = this.page_size) {
      const params = {
        'curr_page': curr_page,
        'page_size': page_size
      }
      if (sp_name != null && sp_name != '') {
        params['sp_name'] = sp_name
      }
      if (sp_nx != null && sp_nx != '') {
        params['sp_nx'] = sp_nx
      }
      if (sp_issy != null && sp_issy != '') {
        params['sp_issy'] = sp_issy
      }
       http.xhrGet(this, this.action.selectSp, params, (res) => {
          this.pagesize = res.data.list.length
          var listkjpl = res.data.list
             this.spList.push(...listkjpl)
            this.loading = false;
          if (this.pagesize < 10) {
              this.finished = true;
              this.$toast.success('没有更多了');
            }
       })
    },
     onLoad() {
            // 异步更新数据
              let sp_name = this.sp.sp_name;
              let sp_nx = this.Catid
                 let timer = setTimeout(() => {
                  this.curr_page++
                  if(this.Catid=="首页"){
                    this.selectSp(null,null,0,this.curr_page,this.page_size)
                  }else{
                    this.selectSp(sp_name,sp_nx,null,this.curr_page,this.page_size)
                 }
                     this.finished && clearTimeout(timer)
                 //   // 加载状态结束
                  }, 1000);
 },
 //  //查询个人信息
 selectUserid(){0
   var id = localStorage.getItem('uid')
   let params={
  'user_id': id
  }
    http.xhrPost(this, this.action.selectUserById, params, (res) => {
     this.userimage = res.data.user_image;
  })},
  detid(id){
  },
  sptext(text){
    if(text!=""){
     this.starttime = event.timeStamp;
            let _this=this;
            let e = event;
            setTimeout(()=>{
                 if (_this.starttime - e.timeStamp == 0) {
                    this.spList=[]
                    this.loading = true;
                    this.finished = false;
                    this.curr_page = 1
                    this.selectSp(text,null,0,this.curr_page,this.page_size)
                 }
            },1000)
  }else{
    this.starttime = event.timeStamp;
           let _this=this;
           let e = event;
           setTimeout(()=>{
              if (_this.starttime - e.timeStamp == 0) {
    if(this.Catid!="首页"){
      this.spList=[]
      this.loading = true;
      this.finished = false;
      this.curr_page = 1
      this.selectSpxx()
    }else{
      this.spList=[]
      this.loading = true;
      this.finished = false;
      this.curr_page = 1
      this.selectSp(null,null,0,this.curr_page,this.page_size)
    }
    }},1000)
  }
  },
  share(){
    return this.loading;
  }
  },
  watch:{
    Catid(data){
      if(data!="首页"){
      this.spList=[]
      this.loading = true;
      this.finished = false;
      this.curr_page = 1
      this.selectSpxx()
    }else{
      this.spList=[]
      this.loading = true;
      this.finished = false;
      this.curr_page = 1
      this.selectSp(null,null,0,this.curr_page,this.page_size)
    }
    }
  },
  created() {

  },
  mounted() {
    setTimeout(()=>{
      if(this.Catid=="首页"){
         this.selectSp(null,null,0,1,this.page_size)
      }else{
         this.selectSpxx()
      }
    },0)
     if(localStorage.getItem('uid')!=null&&localStorage.getItem('uid')!=""&&sessionStorage.getItem("uid")!=""){
       this.selectUserid()
     }
  },
  activated() {
    if(localStorage.getItem('uid')!=null&&localStorage.getItem('uid')!=""&&sessionStorage.getItem("uid")!=""){
      this.selectUserid()
    }else{
      this.userimage=""
    }
  }
}
</script>

<style scoped="scoped">
  .detailparent{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .detaliitem{
      width: 48vw;
      height: 43vw;
      margin: 5px 0vw;
  }
</style>
