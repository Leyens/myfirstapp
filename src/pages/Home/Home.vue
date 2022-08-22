<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor'/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer/ListContainer.vue'
import Recommend from './Recommend/Recommend.vue'
import Rank from './Rank/Rank.vue'
import Like from './Like/Like.vue'
import Floor from './Floor/Floor.vue'
import Brand from './Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      this.$store.dispatch('home/getFloorList')
    },
    computed:{
      ...mapState('home',{floorList:'floorList'})
    }
}
</script>

<style>

</style>