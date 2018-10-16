exports.seed = function (knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex('foods').insert([
          { id: 1, name: 'eggs', calories: '100' },
          { id: 2, name: 'chicken', calories: '150' },
          { id: 3, name: 'pasta', calories: '75' },
          { id: 4, name: 'salmon', calories: '125' },
          { id: 5, name: 'beef', calories: '200' },
          { id: 6, name: 'beans', calories: '300' },
          { id: 7, name: 'cheese', calories: '20' },
          { id: 8, name: 'lettuce', calories: '10' },
          { id: 9, name: 'tomatoes', calories: '25' },
          { id: 10, name: 'onions', calories: '15' }
        ])
          .then(() => console.log('Foods seeded!'))
          .catch(error => console.log(`Error seeding Foods data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Foods data: ${error}`))
}
