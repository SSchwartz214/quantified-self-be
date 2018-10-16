exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex('meal_foods').insert([
              ({ food_id: 1, meal_id: 1 }),
              { food_id: 2, meal_id: 2 },
              { food_id: 3, meal_id: 3 },
              { food_id: 4, meal_id: 4 },
              { food_id: 5, meal_id: 1 },
              { food_id: 6, meal_id: 2 },
              { food_id: 7, meal_id: 3 },
              { food_id: 8, meal_id: 4 },
              { food_id: 9, meal_id: 1 },
              { food_id: 10, meal_id:  2}
        ], 'id')
        .then(() => console.log('Meal Foods seeded!'))
        .catch(error => console.log(`Error seeding Meal Food data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding meal foods data: ${error}`))
}
