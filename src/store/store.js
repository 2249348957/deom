import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//创建一个store仓库
const store = new Vuex.Store({
//state用来存放数据的对象
state:{
//初始值、存放的东西
    cur:0,
    list:[],
    loadingif:false,
    currentTime:0,
    lyricTimer:0,
    yyimgbf:true,
    musicurl:{},
    musiclrc:"",
    musicxq:"",
    musicbfqif:false,
    musicid:null
    },
//定义取数据
getters:{

},
mutations: {
  showLoading(state){
    state.loadingif = true
  },
  hideLoading(state){
    state.loadingif = false
  },
  gcTime(state,timesj){
    state.currentTime = timesj
  },
  gczTime(state,timezsj){
    state.lyricTimer = timezsj
  },
  yyimgbfkz(state){
      state.yyimgbf = true
  },
  yyimgbfkzif(state){
    state.yyimgbf = false
  },
  yyimgbfkzxg(state){
    state.yyimgbf = true
  },
  yymusicurl(state,yyurl){
    state.musicurl = yyurl
  },
  yymusiclrc(state,yylrc){
    state.musiclrc = yylrc
  },
  yymusicxq(state,yyxq){
    state.musicxq = yyxq
  },
  yybfqif(state){
    state.musicbfqif = false
  },
  yybfq(state){
    state.musicbfqif = true
  },
  yyid(state,id){
    state.musicid = id
  },
},
actions: {

}
}
)

export default store;
