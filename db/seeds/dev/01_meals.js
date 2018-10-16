exports.seed = function (knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex('meals').insert([
          { id: 1, name: 'Breakfast' },
          { id: 2, name: 'Lunch' },
          { id: 3, name: 'Dinner' },
          { id: 4, name: 'Snack' }
        ])
          .then(() => console.log('Meals seeded!'))
          .catch(error => console.log(`Error seeding Meals data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding Meals data: ${error}`))
}
