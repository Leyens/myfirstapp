import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)
import HomeOptions from "./Home";
import SearchOptions from "./Search/index";
import DetailOptions from "./Detail/Detail";
import shopCartOptions from "./ShopCart/shopCart";
import userOptions from "./User/user";
import tradeOptions from "./Trade/trade";
export default new Vuex.Store({
  modules:{
    home:HomeOptions,
    search:SearchOptions,
    detail:DetailOptions,
    shopCart:shopCartOptions,
    user:userOptions,
    trade:tradeOptions
  }
})