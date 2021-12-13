import { db, put, query } from './pounchdb'

function initDB() {
  db['users'].createIndex({
    index: {fields: ['name']}
  }).then(function () {
    db['users'].find({
      selector: { 
        name: 'admin',
      },
      fields: ['_id', 'name']
    }).then(res => {
      if (res.docs.length) return
      put('users', { name: 'admin', password: '123456' })
    })
  })
}

function login(data) {
  const { username, password } = data
  return db['users'].createIndex({
    index: {fields: ['name', 'password']}
  }).then(function () {
    return db['users'].find({
      selector: { 
        name: username, // user: {$eq: username}
        password: password 
      },
      fields: ['_id', 'name']
    })
  })
  // query('users', {
  //   selector: {
  //     "name": {"$eq": username}, 
  //     "password": {"$eq": password}
  //   },
  //   fileds: ['_id', 'name']
  // }).then(result => {
  //   console.log('oh, yes', result)
  //   return true
  // }).err(err => {
  //   console.log('oh, no! ', err)
  //   return false
  // })
}

export {
  initDB,
  login
}
