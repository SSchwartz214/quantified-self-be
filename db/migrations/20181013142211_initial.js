exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.integer('calories')

      table.timestamps(true, true)
    }),

    knex.schema.createTable('meal_foods', function (table) {
      table.increments('id').primary()
      table.integer('food_id').references('foods.id')
      table.integer('meal_id').references('meals.id')

      table.timestamps(true, true)
    }),

    knex.schema.createTable('meals', function (table) {
      table.increments('id').primary()
      table.string('name')

      table.timestamps(true, true)
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('foods'),
    knex.schema.dropTable('meal_foods'),
    knex.schema.dropTable('meals')
  ])
}
