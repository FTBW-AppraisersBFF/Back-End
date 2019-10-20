const db = require('../../../api/db-config');


module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('fav')
};

function findBy(filter) {
  return db('fav as f')
    .join('users as u', 'u.id', 'f.userID')
    .join('houses as h', 'h.id', 'f.houseID')
    .join('prices as p', 'p.houseID', 'h.id')
    .select('f.id', 'f.name', 'f.interestLevel', 'h.id as houseID', 'h.zipCode', 'h.yearBuilt', 'h.squareFootage', 'h.bedrooms', 'h.bathrooms', 'p.price')
    .where(filter)
}

function findById(id) {
  return db('fav')
    .where({ id })
    .first()
};

function add(obj) {
  return db('fav')
    .insert(obj, 'id')
    .then(idArr => findById(idArr[0]))
};

function update(id, changes) {
  return db('fav')
    .where({ id })
    .update(changes, 'id')
    .then(count => findById(id))
};

function remove(id) {
  return findById(id)
    .then(res => {
      return db('fav')
        .where({ id })
        .del()
        .then(() => res)
    })
};