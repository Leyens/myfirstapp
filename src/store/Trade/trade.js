import { reqAddressInfo, reqOrderInfo } from "@/api"

const tradeOptions = {
  namespaced:true,
  actions:{
   async getUserAddress({commit}){
       let result = await reqAddressInfo()
       if(result.code==200){
        commit('GETUSERADDRESS',result.data)
       }
    },
   async getOrderInfo({commit}){
     let result = await reqOrderInfo()
     if(result.code==200){
      commit('GETORDERINFO',result.data)
     }
    }
  },
  mutations:{
    GETUSERADDRESS(state,address){
      state.address = address
    },
    GETORDERINFO(state,orderInfo){
      state.orderInfo = orderInfo
    }
  },
  state:{
    address:[],
    orderInfo:{}
  },
  getters:{}
}
export default tradeOptions