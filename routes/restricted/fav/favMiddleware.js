const Fav = require('./favModel')
const Users = require('../../../auth/authModel')
const Houses = require('../houses/housesModel')

module.exports = {
  validateFavId,
  validateFavObj,
  validateUserID,
  validateHouseID,
  validateUsername,
}

function validateFavId (req, res, next) {
  const { id } = req.params

  Fav.findById(id)
    .then(fav => {
      if (fav) {
        next()
      } else {
        res.status(400).json({ message: 'fav id does not exist' })
      }
    })
    .catch(err => res.status(400).json({ err: err.message }))
}

function validateFavObj (req, res, next) {
  const fav = req.body

  if (!fav) res.status(404).json({ message: 'missing fav data' })
  else if (!fav.userID) res.status(404).json({ message: 'missing userID field' })
  else if (!fav.houseID) res.status(404).json({ message: 'missing houseID field' })
  else if (!fav.name) res.status(404).json({ message: 'missing name field' })
  else if (!fav.interestLevel) res.status(404).json({ message: 'missing interestLevel field' })
  else if (fav.interestLevel < 0 || fav.interestLevel > 100) res.status(400).json({ message: 'interestLevel must be between 0 and 100' })
  else next()
}

function validateUserID (req, res, next) {
  const { userID } = req.body

  Users.findById(userID)
    .then(obj =>{
      if (obj) next()
      else res.status(404).json({ message: 'user does not exist' })
    })
    .catch(err => res.status(500).json({ message: 'error validating userID in obj' }))
}

function validateHouseID (req, res, next) {
  const { houseID } = req.body

  Houses.findById(houseID)
    .then(obj =>{
      if (obj) next()
      else res.status(404).json({ message: 'house does not exist' })
    })
    .catch(err => res.status(500).json({ message: 'error validating houseID in obj' }))
}

function validateUsername (req, res, next) {
  const { username } = req.body

  Users.findBy({ username })
    .then(obj =>{
      if (obj.length) next()
      else res.status(404).json({ message: 'user does not exist' })
    })
    .catch(err => res.status(500).json({ message: 'error validating username in obj' }))
}