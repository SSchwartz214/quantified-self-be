exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(() => {
      return Promise.all([
        knex('foods').insert([
          { name: 'eggs', calories: '100' },
          { name: 'chicken', calories: '150' },
          { name: 'pasta', calories: '75' },
          { name: 'salmon', calories: '125' },
          { name: 'beef', calories: '200' },
          { name: 'beans', calories: '300' },
          { name: 'cheese', calories: '20' },
          { name: 'lettuce', calories: '10' },
          { name: 'tomatoes', calories: '25' },
          { name: 'onions', calories: '15' }
        ], 'id')
          .then(() => console.log('Foods seeded!'))
          .catch(error => console.log(`Error seeding Foods data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Foods data: ${error}`));
}
