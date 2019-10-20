const db = require('../../../api/db-config')

module.exports ={
  findBy,
  findById,
  add,
  update,
}

function findBy(filter){
  return db('prices')
    .where(filter)
}

function findById(id) {
  return db('prices')
    .where({ id })
    .first()
}

function add(houseId, price) {
  return db('prices')
    .insert({ houseID: houseId, price: price }, 'id')
    .then(idArr => findById(idArr[0]))
}

function update(houseId, price) {
  return db('prices')
    .where({ houseID: houseId })
    .update({ price: price })
    .then(count => findBy({ houseID: houseId }))
}