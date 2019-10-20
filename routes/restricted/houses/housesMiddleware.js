const Houses = require('./housesModel')

module.exports = {
  validateHouseId,
  validateHouseObj,
}

function validateHouseId(req, res, next) {
  const { id } = req.params

  Houses.findById(id)
    .then(house => {
      if (house) {
        next()
      } else {
        res.status(400).json({ message: 'house id does not exist' })
      }
    })
    .catch(err => res.status(400).json({ err: err.message }))
}

function validateHouseObj(req, res, next) {
  const house = req.body

  if (!house) res.status(404).json({ message: 'missing house data' })
  else if (!house.zipCode) res.status(404).json({ message: 'missing zipCode field' })
  else if (house.zipCode.toString().length !== 5) res.status(400).json({ message: 'zipCode must be 5 digits long' })
  else if (!house.yearBuilt) res.status(404).json({ message: 'missing yearBuilt field' })
  else if (house.yearBuilt.toString().length !== 4) res.status(400).json({ message: 'yearBuilt must be 4 digits long' })
  else if (house.yearBuilt < 1900) res.status(400).json({ message: 'yearBuilt must be 1900 onwards' })
  else if (!house.squareFootage) res.status(404).json({ message: 'missing squareFootage field' })
  else if (house.squareFootage < 400 || house.squareFootage > 10000) res.status(400).json({ message: 'squareFootage must be between 400 and 10000' })
  else if (!house.bedrooms) res.status(404).json({ message: 'missing bedrooms field' })
  else if (house.bedrooms < 1 || house.bedrooms > 8) res.status(400).json({ message: 'bedrooms must be between 1 and 8' })
  else if (!house.bathrooms) res.status(404).json({ message: 'missing bathrooms field' })
  else if (house.bathrooms < 0.5 || house.bathrooms > 6) res.status(400).json({ message: 'bathrooms must be between 0.5 and 6' })
  else next()
}