const Users = require('./authModel')

module.exports = {
  validateUniqueUsername,
}

function validateUniqueUsername(req, res, next) {
  const { username } = req.body

  Users.findBy({ username })
    .then(user => {
      if (user.length) res.status(400).json({ message: "Username already exists. Please choose another." })
      else next()
    })
    .catch(err => res.status(500).json({ message: "There is an error validating username.", ...err }))
}