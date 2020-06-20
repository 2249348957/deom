// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// import store from '@/store/store.js'
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

// Vue.use(vant.Lazyload);
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.config.productionTip = false
// import http from '@/http.js'
//  Vue.prototype.$http = http
/* eslint-disable no-new */
import store from '@/store/store.js'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
