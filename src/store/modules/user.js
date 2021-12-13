import { login, logout, getInfo, getRules } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: {},
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { user, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user: user.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.authCode)
        setToken(data.authCode)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(async response => {
        const { data: user } = response
        console.warn('user', user)
        commit('SET_USER', user)
        commit('SET_NAME', user.name || user.user)
        commit('SET_AVATAR', process.env.VUE_APP_BASE_API + user.head)

        let _roles = []
        // 超管给所有权限
        if (user.user === 'admin' || user.type === 'super') {
          _roles = ['admin']
        } else {
          const { data } = await getRules()
          if (!data) {
            reject('获取权限出错, 请稍后重试！')
          }
          data.forEach(i => {
            const name = i.name !== '#' ? i.name.split('/')[1] : i.title
            const method = (i.method ? '::' + i.method : '').toLowerCase()
            _roles.push(name + method)
          })
        }

        console.warn('_roles', _roles)

        commit('SET_ROLES', _roles)

        resolve({
          roles: _roles
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

