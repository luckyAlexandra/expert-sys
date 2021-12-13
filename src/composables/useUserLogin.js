// import { login, logout, getInfo, getRules } from '@/api/user'
import { login } from '@/db/'
import { ref } from 'vue'

export default function useUserLogin(userInfo) {
  const isSuccess = ref(false)
  const loginFunc = async () => {
    isSuccess.value = await login(userInfo)
  }
  return {
    isSuccess,
    loginFunc
  }
}