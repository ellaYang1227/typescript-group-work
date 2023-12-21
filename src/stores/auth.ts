import { defineStore } from 'pinia';
import { User } from '@/models/api'
import axios from 'axios'
import { IUserInfo } from '@/interface/auth';
import { ref } from 'vue';
export const useAuthStore = defineStore('useAuthStore', ()=> {
  const currentUser = ref<IUserInfo | null>(null);
  const fetchUser = async() => {
    try {
      const response = await User();
      const userData: IUserInfo = response.data;
      currentUser.value = userData;
      setDefaultAuthHeaders(userData);
    }
    catch(error) {
      console.log('error');
    }
  }
  return {
    fetchUser,
  }
})


const setDefaultAuthHeaders = (user: IUserInfo| null) => {
  axios.defaults.headers.common.Authorization = user
    ? `Bearer ${ user.token }`
    : ''
}

