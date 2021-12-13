<template>
  <div class="login-container">
    <div class="login-bg">
    </div>
    <router-link to="/dashboard">dashboard</router-link> 
    <el-form class="login-form" label-position="left"
      ref="loginFormRef"
      :model="loginForm" 
      :rules="loginRules">
      <div class="title-container">
        <img src="@/assets/logo.png" />
        <h3 class="title">hello</h3>
      </div>
      <el-form-item prop="user">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
        </span>
        <el-input
          ref="user"
          v-model="loginForm.user"
          placeholder="登录名"
          name="user"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="password" /> -->
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" class="login-btn" type="warning" @click.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import userStore from '@/store/modules/user'
import { login } from '@/db/'
import { setToken } from '@/utils/auth'

export default defineComponent({
  name: 'login',
  setup() {
    const loginForm = reactive({
        user: '', // admin
        password: '' // Abc12345
    })
    const loginRules = reactive({
      user: [{ required: true, message: '请输入登录名', trigger: 'blur'}],
      password: [{ required: true, message: '请输入密码', trigger: 'blur'}]
    })
    const loading = ref(false)
    const router = useRouter()
    const route = useRoute()
    const redirect = useRoute().query.redirect
    const loginFormRef = ref()
    const passwordType = ref('password')
    const switchPasswordType = () => {
      passwordType.value === 'password' ? '' : 'password'
    }
    const handleLogin = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          // userStore
          //   .login({
          //     username: loginForm.user,
          //     password: loginForm.password,
          //   })
          //   .then(() => {
          //     router.push({ path: String(redirect) || '/' })
          //   })
          //   .finally(() => (loading.value = false))
          login({
            username: loginForm.user,
            password: loginForm.password
          }).then(res => {
            if (res.docs && res.docs.length) {
              setToken('12345')
              const path = redirect || '/'
              if (route.name !== path) {
                router.push({ path })
              }
            }
          })
          // .finally(() => {
          //   loading.value = false
          // })
          .catch(err => {
            console.log(err)
          })
        }
      })
    }
    return {
      loading,
      loginForm,
      loginFormRef,
      loginRules,
      switchPasswordType,
      handleLogin,
      passwordType
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/login_fix";
</style>

<style lang="scss" scoped>
@import "../../styles/login";
</style>
