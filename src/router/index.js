import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
// import register from '@/vivew/register'
// import Login from '@/vivew/Login'
// import userinfo from '@/vivew/userinfo'
// import edit from '@/vivew/edit'
// import Home from '@/vivew/Home'
// import article from '@/vivew/article'
import comment  from '@/vivew/comment'
// import images from '@/vivew/images'
// import addss from '@/vivew/addss'
// import buffer from '@/vivew/buffer'
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

 const routes = [
     {
          path:'/register',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/register')
          //component:resolve => require(['@/vivew/register'],resolve)
        },
        {
          path:'/Login',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/Login')
          //component:resolve => require(['@/vivew/Login'],resolve)
        },
        {
          path:'/userinfo',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/userinfo'),
          //component:resolve => require(['@/vivew/userinfo'],resolve),
          meta:{
            istoken:true,
            keepalive:true
          }
        },
        {
          path:'/edit',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/edit'),
          //component:resolve => require(['@/vivew/edit'],resolve),
          meta: {
            istoken:true
          }
        },
        {
          path:'/',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/Home'),
          //component:resolve => require(['@/vivew/Home'],resolve),
          meta:{
            keepalive:true
          }
        },
        {
          path:'/article',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/article')
          //component:resolve => require(['@/vivew/article'],resolve)
        },
        {
          path:'/comment',
          //component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/comment'),
          component:resolve => require(['@/vivew/comment'],resolve),
          meta:{
            keepalive:true
          }
        },
        {
          path:'/images',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/images')
          //component:resolve => require(['@/vivew/images'],resolve)
        },
        {
          path:'/addss',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/addss')
          //component:resolve => require(['@/vivew/addss'],resolve)
        },
        {
          path:'/buffer',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/buffer')
          //component:resolve => require(['@/vivew/buffer'],resolve)
        },
        {
          path:'/musicmain',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicmain'),
          meta: {
            isbutt:true
          },
          children:[
            {
              path:'/musicmpaihan',
              component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicmpaihan'),
              meta: {
                isbutt:true,
                keepalive:true
              }
              //component:resolve => require(['@/vivew/buffer'],resolve)
            },
            {
              path:'/musicmmain',
              component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicmmain'),
              meta: {
                isbutt:true,
                keepalive:true
              }
              //component:resolve => require(['@/vivew/buffer'],resolve)
            },
            {
              path:'/musicsearch',
              component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicsearch'),
              meta: {
                isbutt:true,
                keepalive:true
              }
              //component:resolve => require(['@/vivew/buffer'],resolve)
            },
            {
              path:'/musicsinger',
              component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicsinger'),
              meta: {
                isbutt:true,
                keepalive:true
              }
              //component:resolve => require(['@/vivew/buffer'],resolve)
            }
          ]
          //component:resolve => require(['@/vivew/buffer'],resolve)
        },
        {
          path:'/musicrank',
          component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicrank'),
          meta: {
            isbutt:true
          }
          //component:resolve => require(['@/vivew/buffer'],resolve)
        }
        // {
        //   path:'/musicbfq',
        //   component: () => import(/* webpackChunkName: "HelloWorld" */ '@/vivew/musicbfq'),
        //   meta: {
        //     isbutt:true
        //   }
        //   //component:resolve => require(['@/vivew/buffer'],resolve)
        // }



 ]
    var router =  new Router({
        routes,
        mode:'history'
    })
    router.beforeEach((to, from, next) => {
      if(!sessionStorage.getItem('uid')&&to.meta.istoken==true){
        router.push('/Login')
        Vue.prototype.$toast.success("请重新登录");   //引用对象
        return
      }
      next()
    })
    export default router;
