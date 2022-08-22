import { reqGetCode, reqGetUserInfo, reqLogin, reqLogOut, reqRegister } from "@/api"
import { getToken, removeToken, setToken } from "@/utils/token"

const userOptions = {
  namespaced:true,
  actions:{
   async getCode({commit},phone){
      let result = await reqGetCode(phone)
      if(result.code==200){
        commit('GETCODE',result.data)
      }
    },
   async userRegister({commit},user){
     let result =  await reqRegister(user)
     if(result.code==200){
      return 'ok'
     }else{
      return Promise.reject(new Error('faile'))
     }
    },
   async userLogin({commit},data){
      let result = await reqLogin(data)
      if(result.code==200){
        commit('USERLOGIN',result.data.token)
        setToken(result.data.token)
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
   async getUserInfo({commit}){
      let result =  await reqGetUserInfo()
      if(result.code==200){
        commit('GETUSERINFO',result.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
   async logOut({commit}){
       let result = await reqLogOut()
       if(result.code==200){
        commit('CLEAR')
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    }
  },
  state:{
    code:'',
    token:getToken(),
    userInfo:{}
  },
  mutations:{
    GETCODE(state,code){
      state.code = code
    },
    USERLOGIN(state,token){
      state.token = token
    },
    GETUSERINFO(state,userInfo){
      state.userInfo = userInfo
    },
    CLEAR(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
  getters:{}
}
export default userOptions