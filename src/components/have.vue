<template>
  <div class="have_f">
    <van-skeleton avatar title :row="5" :loading="loading" v-if="skeleto" />
    <div class="have_ff8"></div>
    <div class="have_ft1">
      <div>
        <img v-if="userkjpllist.user_image != ''" :src="'http://47.115.6.161:8080/resource/img/' + userkjpllist.user_image" alt="" />
        <img v-else src="../assets/tx1.jpg" alt="" />
      </div>
      <div class="have_ft2">
        <p>{{ userkjpllist.user_name }}</p>
        <p class="have_ff13">{{ userkjpllist.kjpl_date | formatDate }}</p>
      </div>
      <div class="have_ft2">
        <p>&nbsp;</p>
        <p>
          <van-icon name="like-o" size="12" color="red" />
          &nbsp;<span class="have_ff12">{{ userkjpllist.kjpl_zt }}</span>
        </p>
      </div>
      <div class="have_ft3" @click="show = true"><van-icon name="weapp-nav" /></div>
    </div>
    <div class="have_ff1">
      <div class="have_ff2">{{ userkjpllist.kjpl_text }}</div>
    </div>
    <div class="have_ff3" v-if="userimg"><img v-for="(items, indexs) in userkjpllist.imglist[0]" :key="indexs" :src="'http://47.115.6.161:8080/kjplwj/img/' + items" alt="" /></div>
    <div class="have_ff4">
      <div><span>浏览30次</span></div>
      <div>
        <label>
          <van-icon name="good-job-o" @click="pldz(userkjpllist.kjpl_id,userkjpllist.kjpl_dz)" v-if="i1" />
          <van-icon name="good-job" @click="pldz(userkjpllist.kjpl_id,userkjpllist.kjpl_dz)" v-else />
        </label>
        <label @click="inputkjpl"><van-icon name="chat-o" /></label>
        <label @click="showShare = true"><van-icon name="share" /></label>
      </div>
    </div>
    <div class="have_ff5" v-show="userkjpllist.kjpl_dz">
      <van-icon name="good-job" size="15" color="#F20D0D" />
      &nbsp;
      <span>{{userkjpllist.kjpl_dz}}</span>
      <span>&nbsp;等{{plts}}人觉得很赞</span>
    </div>
    <div class="have_ff6">
      <input ref="inputkjpl" v-model="pltest" type="text" :placeholder="inputpl" style="padding-left: 5px;"/>
      &nbsp;
      <van-button plain color="#6C757D" type="primary" @click="addUserpl(userkjpllist.kjpl_id)" size="small">发送</van-button>
    </div>

    <userplcz @plid="plids" :userpl="userplList"></userplcz>

    <van-action-sheet v-model="show" :actions="actions" @select="kjplcz" />
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="kjplfs" />
  </div>
</template>
<script>
import http from '@/utils/HttpUtil';
import { formatDate } from '@/utils/date.js';
import axios from 'axios';
import userplcz from '@/components/userplcz.vue';
export default {
  name: 'have',
  props: ['userkjpllist'],
  data() {
    return {
      plts:"",
      inputpl:'评论',
      plid:null,
      pltest: '',
      userplList: [],
      i1: true,
      userimg: true,
      skeleto: false,
      show: false,
      username: [
        { name: 'HXD' },
        { name: 'XHZ' },
        { name: '996' },
        { name: 'HXD' },
        { name: 'HXD' },
        { name: 'HXD' },
        { name: 'HXD' },
        { name: 'HXD' },
        { name: 'HXD' },
        { name: 'HXD' }
      ],
      actions: [{ name: '收藏' }, { name: '举报' }, { name: '@她' }],
      image: [{ img: require('../assets/timg.jpg') }, { img: require('../assets/bj1.jpg') }, { img: require('../assets/timg.jpg') }, { img: require('../assets/bj2.jpg') }],
      showShare: false,
      options: [
        [{ name: '微信', icon: 'wechat' }, { name: '微博', icon: 'weibo' }, { name: 'QQ', icon: 'qq' }],
        [{ name: '复制链接', icon: 'link' }, { name: '分享海报', icon: 'poster' }, { name: '二维码', icon: 'qrcode' }]
      ],
      action: {
        selectPageUserPl: 'blibli/kjpl/selectPageUserPl',
        addUserpl: 'blibli/kjpl/addUserpl',
        updatekjpldz:'blibli/kjpl/updatekjpldz',
        selectkjplbyid:'blibli/kjpl/selectkjplbyid'
        }
    };
  },
  components: {
    userplcz
  },
  methods: {
    kjplcz() {
      this.show = false;
      Toast(item.name);
    },
    kjplfs(item) {
      Toast(option.name);
      this.showShare = false;
    },
    inputkjpl() {
      //获取输入框的焦点
      this.$nextTick(() => {
        this.$refs.inputkjpl.focus();
      });
    },
    userplid() {
      var kjpl_id = this.userkjpllist.kjpl_id;
      axios
        .post(this.action.selectPageUserPl + '/' + kjpl_id, {
          headers: { 'content-type': 'multer/form-date' }
        })
        .then(res => {
          var arr = res.data.data;
          function fn(temp) {
            let arrlist = [];
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].parentId == temp) {
                arrlist.push(arr[i]);
                arr[i].child = fn(arr[i].commentId);
              }
            }
            return arrlist;
          }
          this.userplList = fn(null);
        });
    },
    addUserpl(kjplid) {
      if(!sessionStorage.getItem('uid')){
          this.$toast.fail('登录后才能评论┑(￣Д ￣)┍');
      }else{
      if(this.pltest!=""&&this.pltest!=null){
      let plxx = {
        kjpl_id: kjplid,
        content: this.pltest,
        parentId: this.plid
      };
      http.xhrPost(this, this.action.addUserpl, plxx, res => {
        this.userplid()
        this.$toast.success('评论成功');
        this.pltest=""
        this.inputpl='评论'
        this.plid = null
      });
      }else{
        this.$toast.success('请输入评论');
      }
      }
    },

    plids(userid){
      this.inputpl = "回复:"+userid.name
      this.plid = userid.id
      this.$nextTick(() =>{
        this.$refs.inputkjpl.focus()
      })
    },
    pldz(id,dzs){
        if((localStorage.getItem("token")!=null&&sessionStorage.getItem("uid")!=null)){
          var name =JSON.parse(localStorage.getItem("token")).user_name
          if(this.i1){
             var dztj = dzs+","+name
             var qc = new Set(dztj.split(","))
             let arr = Array.from(qc)

             if(arr[0]=="null"){
                arr.splice(0,1);
             }
             this.plts = arr.length
             var arrjoin = arr.join(",")
             if(arrjoin.substring(0,1)==","){
              arrjoin = arrjoin.substr(1)
             }
             this.userkjpllist.kjpl_dz = arrjoin
             this.starttime = event.timeStamp;
                    let _this=this;
                    let e = event;
                    setTimeout(()=>{
                       if (_this.starttime - e.timeStamp == 0) {
             var params = new URLSearchParams();
             params.append('kjpl_id', id);
             params.append('kjpl_dz', arrjoin);
             params.append('dzpd', name);
           axios.post(this.action.updatekjpldz, params).then(res=>{
              this.dzselect()
              this.plts =arr.length
           })
          }},1000)
              this.i1 = false
          }else{
              var qc = new Set(this.userkjpllist.kjpl_dz.split(","))
              let arr = Array.from(qc)
              arr.splice(arr.indexOf(name),1);
              this.plts = arr.length
              var arrjoin = arr.join(",")
              this.userkjpllist.kjpl_dz = arrjoin
              this.starttime = event.timeStamp;
                        let _this=this;
                        let e = event;
                        setTimeout(()=>{
                           if (_this.starttime - e.timeStamp == 0) {
                 var params = new URLSearchParams();
                 params.append('kjpl_id', id);
                 params.append('kjpl_dz', arrjoin);
                 params.append('dzpd', name);
               axios.post(this.action.updatekjpldz, params).then(res=>{
                  this.dzselect()
                  this.plts =arr.length
               })
              }},1000)
              this.i1 = true
          }
      }else{
              this.$toast.fail('请重新登录后在试试！');
      }
    },
    dzselect(){
      axios.post(this.action.selectkjplbyid+"/"+this.userkjpllist.kjpl_id).then(res=>{
        this.userkjpllist.kjpl_dz=res.data.data[0].kjpl_dz
      })
    }
  },
  mounted() {
    var qc = new Set(this.userkjpllist.kjpl_dz.split(","))
    let arr = Array.from(qc)
    this.plts = arr.length
    this.i1 = this.userkjpllist.kjpl_dz.search(JSON.parse(localStorage.getItem("token")).user_name) == -1
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy.MM.dd');
    }
  },
  created() {
      this.userplid();
  }
};
</script>

<style scoped="scoped">
.fl {
  float: left;
}
.have_f {
  width: 100%;
  padding: 10px 0px;
  overflow: hidden;
  background-color: white;
}
.have_ft1 {
  display: flex;
  position: relative;
  width: 100%;
  height: 12vw;
  margin: 5px 0;
}
.have_ft1 div img {
  width: 12vw;
  height: 12vw;
  display: block;
  border-radius: 50%;
}
.have_ft2 {
  margin: 0 15px;
}
.have_ft2 p {
  display: block;
  height: 7vw;
  margin: 1vw;
}
.have_ft2 p:nth-child(1) {
  font-size: 4.2vw;
  font-weight: 600;
  color: crimson;
}
.have_ft3 {
  position: absolute;
  top: 0;
  right: 1vw;
}
.have_ff1 {
  width: 100%;
  padding: 5px 0px;
  overflow: hidden;
  background-color: white;
}
.have_ff2 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  color: #e0a800;
  font-size: 4vw;
  padding: 5px 0px;
  letter-spacing: 1px;
  font-family: '宋体';
  overflow: hidden;
  background-color: white;
}
.have_ff3 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0px;
  overflow: hidden;
  background-color: white;
}
.have_ff3 img {
  width: 47%;
  height: 170px;
  margin: 1vw;
}
.have_ff4 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0px;
  overflow: hidden;
  background-color: white;
  border-bottom: 1px solid #999;
}
.have_ff4 span {
  font-size: 3vw;
  color: #999999;
}
.have_ff4 label {
  margin: 0 5px;
  font-size: 5vw;
}
.have_ff5 {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 3vw;
}
.have_ff6 {
  display: flex;
  z-index: 2;
  margin: 5px 0;
  width: 100%;
}
.have_ff6 input {
  width: 80%;
  font-size: 4vw;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
}
.have_ff8 {
  width: 100%;
  min-height: 12px;
  z-index: 99;
  background: url(../assets/bj2.jpg) no-repeat;
}
 .have_ff12{
          font-weight: bold;
          font-family: "Comic Sans MS";
          background: -webkit-linear-gradient(left,
                      #ffffff,
                      #ff0000 6.25%,
                      #ff7d00 12.5%,
                      #ffff00 18.75%,
                      #00ff00 25%,
                      #00ffff 31.25%,
                      #0000ff 37.5%,
                      #ff00ff 43.75%,
                      #ffff00 50%,
                      #ff0000 56.25%,
                      #ff7d00 62.5%,
                      #ffff00 68.75%,
                      #00ff00 75%,
                      #00ffff 81.25%,
                      #0000ff 87.5%,
                      #ff00ff 93.75%,
                      #ffff00 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-size: 200% 100%;
                  animation: masked-animation 7s infinite linear;
          }
  @keyframes masked-animation {
          0% {
              background-position: 0 0;
          }
          100% {
              background-position: -100%, 0;
          }
      }
      .have_ff13{
        padding-top: 2px;
        font: "宋体";
        font-size: 3.5vw;
        font-weight: 600;
      }
</style>
