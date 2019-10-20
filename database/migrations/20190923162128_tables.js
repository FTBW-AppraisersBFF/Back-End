
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 255)
        .notNullable()
        .unique()
      tbl.string('password', 255).notNullable();
    })

    .createTable('houses', tbl => {
      tbl.increments();
      tbl.integer('zipCode', 5)
        .notNullable()
      tbl.integer('yearBuilt', 4)
        .notNullable()
      tbl.integer('squareFootage', 5)
        .notNullable()
      tbl.integer('bedrooms', 2)
        .notNullable()
      tbl.float('bathrooms', 2)
        .notNullable()
    })

    .createTable('fav', tbl => {
      tbl.increments()
      tbl.integer('userID', 3)
        .unsigned()
        .notNullable()
        .references('id').inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('houseID', 3)
        .unsigned()
        .notNullable()
        .references('id').inTable('houses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.string('name', 256)
        .notNullable()
      tbl.integer('interestLevel', 3)
    })

    .createTable('prices', tbl => {
      tbl.increments()
      tbl.integer('houseID')
        .unsigned()
        .notNullable()
        .references('id').inTable('houses')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.float('price')
        .notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema 
    .dropTableIfExists('prices')
    .dropTableIfExists('fav')
    .dropTableIfExists('houses')
    .dropTableIfExists('users')
};
