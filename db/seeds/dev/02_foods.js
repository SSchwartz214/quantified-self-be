exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('foods').del() // delete all footnotes first

    // Now that we have a clean slate, we can re-insert our food data
    .then(() => {
      return Promise.all([

        // Insert foods
        knex('foods').insert([
          {id: 1, name: 'eggs', calories: '100'},
          {id: 2, name: 'chicken', calories: '150'},
          {id: 3, name: 'pasta', calories: '75'},
          {id: 4, name: 'salmon', calories: '125'},
          {id: 5, name: 'beef', calories: '200'},
          {id: 6, name: 'beans', calories: '300'},
          {id: 7, name: 'cheese', calories: '20'},
          {id: 8, name: 'lettuce', calories: '10'},
          {id: 9, name: 'tomatoes', calories: '25'},
          {id: 10, name: 'onions', calories: '15'}
        ])
        .then(() => console.log('Foods seeded!'))
        .catch(error => console.log(`Error seeding Foods data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding Foods data: ${error}`));
};
