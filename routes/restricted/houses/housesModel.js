const db = require('../../../api/db-config');

module.exports = {
  find,
  findById,
  findByIdWithPrice,
  add,
  update,
  remove,
};

function find() {
  return db('houses as h')
    .join('prices as p', 'h.id', 'p.houseID')
    .select('h.id', 'h.zipCode', 'h.yearBuilt', 'h.squareFootage', 'h.bedrooms', 'h.bathrooms', 'p.price')
};

function findById(id) {
  return db('houses')
    .where({ id })
    .first()
};

function findByIdWithPrice(id) {
  return db('houses as h')
    .join('prices as p', 'h.id', 'p.houseID')
    .select('h.id', 'h.zipCode', 'h.yearBuilt', 'h.squareFootage', 'h.bedrooms', 'h.bathrooms', 'p.price')
    .where({ houseID: id })
    .first()
};

function add(obj) {
  return db('houses')
    .insert(obj, 'id')
    .then(idArr => findById(idArr[0]))
};

function update(id, changes) {
  return db('houses')
    .where({ id })
    .update(changes)
    .then(count => findByIdWithPrice(id))
};

function remove(id) {
  return findById(id)
    .then(res => {
      return db('houses')
        .where({ id })
        .del()
        .then(() => res)
    })
};