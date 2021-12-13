import { createStore } from 'vuex'
import getters from './getters'

let files = import.meta.globEager('./modules/*.js')
let modules = {}

for (const path in files) {
    modules[path.replace(/\.\/\modules\/|\.js/g, '')] = files[path].default
}

const store = createStore({
  modules,
  getters
})

export default store
