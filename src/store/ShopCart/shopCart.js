import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const shopCartOptions = {
  namespaced:true,
  actions:{
   async getCartList({commit}){
        let result =  await reqCartList()
        if(result.code==200){
          commit('GETCARTLIST',result.data)
        }
    },
   async deleteCartListBySkuId({commit},skuId){
      let result = await reqDeleteCartById(skuId)
      if(result.code==200){
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
   async updateCheckedById({commit},{skuId,isChecked}){
        let result =  await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
          return 'ok'
        }else{
          return Promise.reject(new Error('faile'))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
      let promiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
        promiseAll.push(promise)
      });
      return Promise.all(promiseAll)
    },
    updateAllCartIsChecked({dispatch,state},isChecked){
      let promiseAll = []
      state.cartList[0].cartInfoList.forEach(item=>{
        let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
        promiseAll.push(promise)
      })
      return Promise.all(promiseAll)
    }
  },
  mutations:{
    GETCARTLIST(state,cartList){
      state.cartList = cartList
    }
  },
  state:{
    cartList:[]
  },
  getters:{
    cartList(state){
      return state.cartList[0]||{}
    }
  
  }
}
export default shopCartOptions