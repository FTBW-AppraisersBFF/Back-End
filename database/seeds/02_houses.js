
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('houses')
    .then(function () {
      // Inserts seed entries
      return knex('houses').insert([
        {zipCode: 90210, yearBuilt: 1960, squareFootage: 1000, bedrooms: 8, bathrooms: 5.5},
        {zipCode: 10024, yearBuilt: 1975, squareFootage: 2500, bedrooms: 1, bathrooms: 0.5},
        {zipCode: 60007, yearBuilt: 1920, squareFootage: 5200, bedrooms: 3, bathrooms: 2},
        {zipCode: 29083, yearBuilt: 1987, squareFootage: 2800, bedrooms: 2, bathrooms: 2},
        {zipCode: 52134, yearBuilt: 1990, squareFootage: 3200, bedrooms: 5, bathrooms: 3},
        {zipCode: 47362, yearBuilt: 2004, squareFootage: 9600, bedrooms: 3, bathrooms: 2.5},
      ]);
    });
};
