<template>
  <div>
    <h1 v-upper="msg"></h1>
    <Header/>
    <router-view></router-view>
    <!-- 在Home Search显示，在登录注册隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  components:{
    Header,
    Footer
  },
  mounted(){
     this.$store.dispatch('home/categoryList')
  },
  data(){
    return{
      msg:'abc'
    }
  }
}
</script>

<style>

</style>