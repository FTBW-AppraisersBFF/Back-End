const db = require('../api/db-config');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('users')
};

function findBy(username) {
  return db('users').where(username)
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
};

function add(obj) {
  return db('users')
    .insert(obj, 'id')
    .then(idArr => findById(idArr[0]))
};

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes, 'id')
    .then(count => findById(id))
};

function remove(id) {
  return findById(id)
    .then(res => {
      return db('users')
        .where({ id })
        .del()
        .then(() => res)
    })
};