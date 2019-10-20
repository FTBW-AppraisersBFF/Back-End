
exports.seed = function(knex) {
  return knex('fav')
    .then(function () {
    
      return knex('fav').insert([
        {userID: 1, houseID: 1, name: 'Cool house', interestLevel: 75},
        {userID: 2, houseID: 2, name: 'Nice view from patio', interestLevel: 80},
        {userID: 3, houseID: 3, name: 'Great interior', interestLevel: 100},
        {userID: 1, houseID: 4, name: 'Public transportation accessible', interestLevel: 91},
        {userID: 3, houseID: 5, name: 'Great view', interestLevel: 88},
        {userID: 3, houseID: 6, name: 'Could be closer to the city', interestLevel: 73},
      ]);
    });
};
