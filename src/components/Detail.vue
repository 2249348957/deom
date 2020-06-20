<template>
  <div class="det_f">
   <div style="position: relative;" @click="tiaoz(detailtem.sp_id)">
     <!-- http://47.115.6.161 http://localhost:8080-->
   <img :src="'http://47.115.6.161:8080/upload/img/'+detailtem.sp_image" alt="图片加载失败"/>
   <div class="det_e">
   <span><van-icon name="manager" /></span>
   <span>{{detailtem.sp_gkrs}}</span>
   </div>
   </div>
   <p class="p1">{{detailtem.sp_name}}</p>
    <div class="det_h">
      <van-tag v-if="detailtem.sp_gkrs%3==0" class="biaoq" color="#f2826a">{{detailtem.sp_bq}}</van-tag>
       <van-tag v-else-if="detailtem.sp_gkrs%3==1" color="#f2826a" plain>{{detailtem.sp_bq}}</van-tag>
      <van-tag v-else>{{detailtem.sp_bq}}</van-tag>
    </div>
    <div class="det_g" @click="show=true">
      <img src="../assets/gd1.png" alt=""/>
    </div>
    <van-action-sheet v-model="show" title="" cancel-text="取消">
      <div class="content">
        <div class="det_k">
          <p>网站视频素材均来自网络</p>
          <p>如有不妥，麻烦联系删除</p>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default{
  props:['detailtem'],
  inject:['reload'],
  data () {
    return {
      show:false
    }
  },
  components: {

  },
  methods: {
  tiaoz(d){
    if(this.$route.path=="/article"){
      this.$router.push({path: "/article", query: {id: d}})
      this.reload();

    }else{
    this.$router.push({path: "/article", query: {id: d}})

    }
    //this.$router.go(0);
    //this.$router.push(this.$route.path)
   // this.$router.push({path: "/buffer", query: {id: d}})
  }
  }
}
</script>

<style scoped="scoped">
  .det_f{
    margin: 5px 0;
    background-color: white;
    border-radius: 5px;
    padding-bottom: 5px;
    border: 1px solid #f3f3f3;
    position: relative;
  }
  .det_f span{
    color:  white;
    font-size: 2.5vw;
  }
  .det_f img{
     width: 100%;height: 30vw;
     overflow: hidden;
  }
  .det_e{
    position: absolute;
    width: 100%;
    bottom: 0;
    background:linear-gradient(0deg,rgba(0,0,0,.70),transparent);
  }
  .det_e span:nth-child(1){
    margin-left: 5px;
  }
  .det_f p{
    padding: 0 1vw;
    font-size: 3.5vw;
  }
  .det_g{
    position: absolute;
    width: 12px;
    right: 2vw;
    bottom: 0;
  }
  .det_g img{
    width: 5vw;
    height: 5vw;
  }
  .p1{
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .det_h{
    position: absolute;
    left: 5px;
    bottom: 5px
  }
  .det_k{
    width: 100%;
    padding-left: 10px;
  }
</style>
