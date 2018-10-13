exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('meal_foods').del() // delete all footnotes first

    // Now that we have a clean slate, we can re-insert our meal data
    .then(() => {
      return Promise.all([

        // Insert meal foods
        knex('meal_foods').insert([
              {food_id: 1, meal_id: 1},
              {food_id: 2, meal_id: 2}, 
              {food_id: 3, meal_id: 3}, 
              {food_id: 4, meal_id: 4}, 
              {food_id: 5, meal_id: 1}, 
              {food_id: 6, meal_id: 2},
              {food_id: 7, meal_id: 3}, 
              {food_id: 8, meal_id: 4}, 
              {food_id: 9, meal_id: 1},
              {food_id: 10, meal_id: 2}
        ])
        .then(() => console.log('Meal Foods seeded!'))
        .catch(error => console.log(`Error seeding Meal Food data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding meal foods data: ${error}`));
};