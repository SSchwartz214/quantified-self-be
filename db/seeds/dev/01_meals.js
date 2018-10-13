exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('meals').del() // delete all footnotes first

    // Now that we have a clean slate, we can re-insert our meal data
    .then(() => {
      return Promise.all([

        // Insert meals
        knex('meals').insert([
          {id: 1, name: 'Breakfast'},
          {id: 2, name: 'Lunch'},
          {id: 3, name: 'Dinner'},
          {id: 4, name: 'Snack'}
        ])
        .then(() => console.log('Meals seeded!'))
        .catch(error => console.log(`Error seeding Meals data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding Meals data: ${error}`));
};