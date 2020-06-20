<template>
  <div>

  <div class="have_ff7">
      <div class="have_ff10" v-for="(item,index) in userpl" :key="index">  <!-- 一级评论 -->
        <div v-on:click.stop="hquplid(item.commentId,item.user_name)" style="display: flex; margin: 3px 0;">
        <p style="white-space:normal">{{item.user_name}} : <span style="color: #0091CA">{{item.content}}</span></p>
        </div>

        <div class="have_ff11" v-for="(toitem,toindex) in item.child" :key="toindex">   <!-- 二级评论 -->

          <div v-on:click.stop="hquplid(toitem.commentId,toitem.user_name)" v-if="!toitem.commentId" style="display: flex; margin: 3px 0;">
          <div>{{toitem.user_name}} : 1</div><div><span style="color: #0091CA">{{toitem.content}}</span></div>
          </div>
          <div v-on:click.stop="hquplid(toitem.commentId,toitem.user_name)" v-else style="display: flex; margin: 3px 0;">
          <div>{{toitem.user_name}} 回复 {{item.user_name}} : </div><div><span style="color: #0091CA">{{toitem.content}}</span></div>
          </div>

        <commentchild-item @plid="hquplids" :userpl="toitem.child"></commentchild-item>
          <!-- <div style="margin: 2px 0;" v-for="(sueitem,sueindex) in toitem.child" :key="sueindex">  <!三级评论-->
        <!-- <div style="display: flex;">
          <div>{{sueitem.user_name}} 回复 <span style="color:#00FFFF;">{{toitem.user_name}}</span>:</div><div>{{sueitem.content}}</div>
          </div>

             <div style="display: flex;margin: 2px 0;" v-for="(fuoitem,fuoindex) in sueitem.child" :key="fuoindex">  <!四级评论 -->
           <!-- <div>{{fuoitem.user_name}} 回复 <span style="color:#00FFFF;">{{sueitem.user_name}}:</span></div><div>{{fuoitem.content}}</div>
             </div>

         </div> -->

        </div>

      </div>
  </div>
  </div>
</template>
<script>
export default{
  name:'commentchildItem',
  props:['userpl','temp'],
  data () {
    return {
    }
  },
  components: {

  },
  methods: {
    hquplid(id,name){

      let nameid = {
        id,name
      }
      this.$emit('plid',nameid)
       // console.log(nameid)
    },
    hquplids(ids,names){
      // console.log(names)
      this.$emit('plid',ids)
    }
  }
}
</script>

<style scoped="scoped">


  .have_ff7{
    font-size: 3.2vw;
    font-family: "宋体";
  }
  .have_ff10{
    padding-right: 2vw;
  }
  .have_ff10 span{
    font-size: 3.2vw;
    color: #80BDFF;
  }
  .have_ff11{
    margin: 2px 0;
    padding-left: 2vw;
    padding-right: 2vw;
  }


</style>
