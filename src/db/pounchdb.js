// const PouchDB = require('pouchdb')
// PouchDB.plugin(require('pouchdb-find'));

let db = {
  experts: new PouchDB('db/experts'),
  users: new PouchDB('db/users')
}

/**
 * Create/update a document
 */
const put = function(name, doc) {
  // 数据格式
  const { _id, _rev, ...rest } = doc
  const row = {
    _id: doc._id || new Date().toISOString(),
    _rev,
    ...rest
  }
  db[name].put(row)
  .then((res) => {
    console.log('insert/update', res)
  })
  .catch((err) => {
    console.error(err)
  })
}

/**
 * Fetch a document
 */
const fetch = function(name, docId, options) {
  return db[name].get(docId, options)
}

/**
 * Delete a document
 * required at least an _id and a _rev property
 */
const del = function(name, doc) {
  return db[name].remove(doc._id, doc._rev)
}

/**
 * Create/update a batch of documents
 */
const batchPut = function (name, docs, options) {
  return db[name].bulkDocs(docs, [options], [callback])
}

/**
 * Fetch a batch of documents
 */
const batchFetch = function (name, options) {
  return db[name].allDocs(options)
}

/**
 * Query index
 */
const query = function(name, request) {
  return db[name].find(request)
}

/**
 * Fetch a document
 */
const get = function(name, _id) {
  return db[name].get(_id)
}

/**
 * 删除数据，通过实例删除
 */
const delByInstance = function(name) {
  db[name].get(_id, function(err, doc) {
    if (err) { return console.log(err) }
    db.remove(doc, function(err, response) {
      if (err) { return console.log(err) }
    })
  })
}

export {
  db,
  put,
  fetch,
  del,
  batchPut,
  batchFetch,
  query,
  get,
  delByInstance
}