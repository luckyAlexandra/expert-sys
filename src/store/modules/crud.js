import { fetchList, fetchItem, createItem, updateItem, deleteItem, sendRequest } from '@/api/crud'

const getDefaultState = () => {
  return {
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  list({ commit }, payload) {
    return new Promise((resolve, reject) => {
      fetchList(payload.apiName, payload.query).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  get({ commit }, payload) {
    return new Promise((resolve, reject) => {
      fetchItem(payload.apiName, payload.id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ commit }, payload) {
    return new Promise((resolve, reject) => {
      deleteItem(payload.apiName, payload.id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  create({ commit }, payload) {
    return new Promise((resolve, reject) => {
      createItem(payload.apiName, payload.data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  update({ commit }, payload) {
    return new Promise((resolve, reject) => {
      updateItem(payload.apiName, payload.data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  request({ T }, payload) {
    return new Promise((resolve, reject) => {
      sendRequest(payload.apiName, payload.method, payload.id, payload.query, payload.data, payload.responseType).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

