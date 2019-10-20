
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('prices')
    .then(function () {
      // Inserts seed entries
      return knex('prices').insert([
        {houseID: 1, price: 690000},
        {houseID: 2, price: 480500},
        {houseID: 3, price: 672340},
        {houseID: 4, price: 345678},
        {houseID: 5, price: 534213},
        {houseID: 6, price: 732134},
      ]);
    });
};
