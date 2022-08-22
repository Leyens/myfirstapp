import {reqAddOrUpdateShopCart, reqGoodsInfo} from '../../api/index'
import {getUUID} from '../../utils/uuid_token'
const DetailOptions = {
  namespaced:true,
  actions:{
   async getGoodInfo({commit},skuId){
       let result = await reqGoodsInfo(skuId)
       if(result.code==200){
        commit("GETGOODINFO",result.data)
       }
    },
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
       let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
          return 'ok'
        }else{
          return Promise.reject(new Error('faile'))
        }
    }
  },
  mutations:{
    GETGOODINFO(state,goodInfo){
      state.goodInfo = goodInfo
    }
  },
  state:{
    goodInfo:{},
    uuid_token:getUUID()
  },
  getters:{
    categoryView(state){
      return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
      return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
      return state.goodInfo.spuSaleAttrList||[]
    }
  }
}
export default DetailOptions