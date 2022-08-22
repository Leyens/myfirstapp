import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
// 注册全局组件
import TypeNav from './components/TypeNav/TypeNav.vue'
import Carsouel from './components/Carousel/Carousel.vue'
import Pagination from './components/Pagination/Pagination.vue'
import { MessageBox } from 'element-ui'
import store from './store/index'
import './mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import VueLazyLoad from 'vue-lazyload'
import atm from './assets/v2-b018967bc75e122e16d26e588fcabee1_b.gif'
import myPlugins from './plugins/MyPlugins'
import VeeValidate from './plugins/validate.js'
Vue.use(VueLazyLoad, {
  loading: atm
})
Vue.use(myPlugins,{name:'upper'})
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsouel.name, Carsouel)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
