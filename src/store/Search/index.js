import { reqGetSearchInfo } from "@/api"
const SearchOptions = {
  namespaced:true,
  actions:{
   async getSearchInfo({commit},params={}){
      const result = await reqGetSearchInfo(params)
      if(result.code==200){
        commit("GETSEARCHLIST",result.data)
      }
    }
  },
  state:{
    searchList:{}
  },
  mutations:{
    GETSEARCHLIST(state,searchList){
      state.searchList = searchList
    }
  },
  getters:{
    goodsList(state){
      return state.searchList.goodsList||[]
    },
    trademarkList(state){
      return state.searchList.trademarkList||[]
    },
    attrsList(state){
      return state.searchList.attrsList||[]
    }
  },
}
export default SearchOptions