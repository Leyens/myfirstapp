import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
Vue.use(VueRouter)
// import Home from '../pages/Home/Home.vue'
// import Login from '../pages/Login/Login.vue'
import Search from '../pages/Search/Search.vue'
import Register from '../pages/Register/Register.vue'
import Detail from '../pages/Detail/index.vue'
import AddCartSuccess from '../pages/AddCartSuccess/index.vue'
import ShopCart from '../pages/ShopCart/index.vue'
import Trade from '../pages/Trade/index.vue'
import Pay from '../pages/Pay/index.vue'
import PaySuccess from '../pages/PaySuccess/index.vue'
import Center from '../pages/Center/index.vue'
import MyOrder from '../pages/Center/MyOrder/index.vue'
import GroupOrder from '../pages/Center/GroupOrder/index.vue'
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
let router = new VueRouter({
  routes: [
    { path: '/home', component: () => import('@/pages/Home/Home.vue'), meta: { show: true } },
    { path: '/login', component: () => import('@/pages/Login/Login.vue'), meta: { show: false } },
    { path: '/register', component: Register, meta: { show: false } },
    { path: '/search/:keyword?', name: 'search', component: Search, meta: { show: true } },
    { path: '/detail/:skuid', component: Detail, meta: { show: true } },
    { path: '/addcartsuccess', name: "addcartsuccess", component: AddCartSuccess, meta: { show: true } },
    { path: '/shopcart', name: "shopcart", component: ShopCart, meta: { show: true } },
    {
      path: '/trade', component: Trade, meta: { show: true }, beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay', component: Pay, meta: { show: false },
      beforeEnter:(to,from,path) => {
        if(from.path=='/trade'){
          next()
        }else{
          next(false)
        }
      }
    },
    { path: '/paysuccess', component: PaySuccess, meta: { show: false } },
    { path: '/center', component: Center, meta: { show: true }, children: [{ path: 'myorder', component: MyOrder }, { path: 'grouporder', component: GroupOrder }, { path: '/center', redirect: '/center/myorder' }] },
    { path: '/', redirect: '/home' },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  // next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // token失效
          await store.dispatch('user/logOut')
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
export default router