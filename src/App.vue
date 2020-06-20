<template>
  <div id="app">

      <!--keep-alive 页面不会被销毁 -->
<keep-alive>
    <router-view v-if="isRouterAlive&&$route.meta.keepalive"></router-view>
 </keep-alive>
    <router-view v-if="isRouterAlive&&!$route.meta.keepalive"></router-view>

<tabbar v-if="!$route.meta.isbutt" class="tab"></tabbar>
  </div>
</template>

<script>

    import tabbar from '@/components/tabbar.vue'

export default {
  name: 'App',
   provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
              return {
                  reload: this.reload
              }
          },
           data() {
                      return{
                          bjtshow:true,
                          bjtkz:false,
                          isRouterAlive: true                    //控制视图是否显示的变量
                      }
                  },
                  methods: {
                      reload () {
                          this.isRouterAlive = false;            //先关闭，
                          this.$nextTick(function () {
                              this.isRouterAlive = true;         //再打开
                          })
                      }

                  },
  components:{
    tabbar
  },
  mounted() {
  }

}
// const load = document.getElementsByClassName('loading-first')[0]
//   	const body = document.querySelectorAll('body')[0]
//   	let data = sessionStorage.getItem('loading-first');
//
//   		setLoad(body, load)
//
//
//   	function setLoad(body, load) {
//   		// body.style.overflow = 'hidden';
//   		load.style.display = 'block';
//   		setTimeout(() => {
//   			load.style.display = 'none'
//   			// body.style.overflow = '';
//   			body.setAttribute('class', 'anim')
//   		}, 1000);
//
//   	}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
    background-color: #f4f4f4;
  }
  p{
    font-size: 12px;
    margin: 0;
    padding: 0;
  }
  .tab{
    max-width: 80%;
  }

</style>
