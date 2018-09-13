import Vuex from 'vuex'
import Vue from 'vue'
import persistedstate from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo:{
      avatar:'',
      desc:'',
      email:'',
      nickname:'',
      username:''
    }
  },
  mutations: {
    SET_INFO (state,info) {
      state.userInfo = info
    }
  },
  plugins: [
    persistedstate({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) =>
          sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})

export default store
