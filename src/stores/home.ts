import { defineStore } from 'pinia';
import { Login } from '@/models/api'
export const usehomeStore = defineStore('home', ()=> {
  const fetchLogin = async(data:Object) => {
    await Login({ data }).then((res) => {
        console.log(res)
    })
  }
  return {
    fetchLogin
  }
})