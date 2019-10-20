const db = require('../api/db-config');

module.exports = () => {
  return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
};