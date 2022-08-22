import { reqCategoryList, reqFloorList, reqGetBannerList} from "@/api"
const HomeOptions = {
  namespaced:true,
  actions:{
   async categoryList({commit}){
     let result =  await reqCategoryList()
     if(result.code==200){
        commit('CATEGORYLIST',result.data)
     }
    },
   async getBannerList({commit}){
      let result =  await reqGetBannerList()
      if(result.code == 200){
        commit('GETBANNERLIST',result.data)
      }
    },
     async getFloorList({commit}){
          let result = await reqFloorList()
          if(result.code==200){
            commit('GETFLOORLIST',result.data)
          }
      }
  },
  state:{
    categoryList:[],
    bannerList:[],
    floorList:[]
  },
  mutations:{
    CATEGORYLIST(state,categoryList){
      state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
      state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
      state.floorList = floorList
    }
  },
  getters:{}
}
export default HomeOptions