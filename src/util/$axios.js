import axios from 'axios';
import Vue from 'vue';

import router from '../router/index'

var xhr = axios.create({
  baseURL: '/api/admin',
  // timeout: 5000,
  withCredentials:true
});
var $axios = {
  get(url, params, config,method='get') {
    return new Promise((resolve, reject) => {
      xhr[method](url,{params: params,config}).then(res => {
        if(res.data.code == 401){
          router.push('/login')
        }
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  post(url, params, config,method='post') {
    return new Promise((resolve, reject) => {
      xhr[method](url, params, config).then(res => {
        if(res.data.code == 401){
          router.push('/login')
        }
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  put(url, params, config){
    return this.post(url, params, config,'put')
  },
  delete(url, params, config){
    return this.post(url, params, config,'delete')
  }
}

Vue.prototype.$axios =$axios;
