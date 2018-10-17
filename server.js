const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'DELETE, PATCH, POST')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (request, response) => {
  response.send('Hello, Quantified Self!')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/foods', (request, response) => {
  const rawFood = request.body

  for (let requiredParameter of ['name', 'calories']) {
    if (!rawFood.food[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {food: { name: <String>, calories: <Integer> }.  You're missing a "${requiredParameter}" property.` })
    }
  }

  database('foods').insert(rawFood.food, 'id')
    .then((food) => {
      response.status(201).json({ id: food })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select('id', 'name', 'calories')
    .then(food => {
      if (food.length) {
        response.status(200).json(food.pop())
      } else {
        response.status(404).json({
          error: `Could not find food with id ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).del()
    .then(() => {
      response.status(204).send(`Successfully deleted food with id ${request.params.id}`
      )
    })
    .catch(error => {
      response.status(404).json({ error })
    })
})

app.patch('/api/v1/foods/:id', (request, response) => {
  database('foods')
    .where({ id: request.params.id })
    .update({ name: request.body.food.name, calories: request.body.food.calories })
    .then((id) => {
      return database('foods').where('id', id).first()
    })
    .then((food) => {
      response.status(200).json(food)
    })
    .catch((error) => {
      response.status(400).json({ error })
    })
})

app.get('/api/v1/meals', (request, response) => {
  database.raw(`
    SELECT meals.id, meals.name, array_to_json
    (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
    AS foods
    FROM meals
    JOIN meal_foods ON meals.id = meal_foods.meal_id
    JOIN foods ON meal_foods.food_id = foods.id
    GROUP BY meals.id`)
    .then((meals) => {
      response.status(200).json(meals.rows)
    })
    .catch((error) => {
      response.status(404).json({ error })
    })
})

app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  const mealId = request.params.meal_id
  const foodId = request.params.id

  let targetMeal
  let targetFood

  database('meals').where('id', mealId).first()
    .then(meal => {
      targetMeal = meal
      return database('foods').where('id', foodId).first()
    })
    .then(food => {
      targetFood = food
    })
    .then(() => {
      if (targetMeal && targetFood) {
        return database('meal_foods').insert([{ food_id: foodId, meal_id: mealId }], 'id')
      }
    })
    .then(() => {
      response.status(201).json({ message: `Successfully added ${targetFood.name} to ${targetMeal.name}` })
    })
    .catch((error) => {
      response.status(400).json({ error })
    })
})

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  let id = request.params.meal_id
  database.raw(`
    SELECT meals.id, meals.name, array_to_json
    (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
    AS foods
    FROM meals
    JOIN meal_foods ON meals.id = meal_foods.meal_id
    JOIN foods ON meal_foods.food_id = foods.id
    WHERE meals.id = ${id}
    GROUP BY meals.id`)
    .then((foods) => {
      response.status(200).json(foods.rows[0])
    })
    .catch((error) => {
      response.status(404).json({ error })
    })
})

app.delete('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  let mealId = request.params.meal_id
  let foodId = request.params.id
  database('meal_foods').where('meal_id', mealId).where('food_id', foodId)
    .then(result => {
      return database('meal_foods').where({ id: result[0].id }).del()
    })
    .then(mealFood => {
      response.status(204).send({ message: `Successfully deleted food with id ${mealId}` })
    })
    .catch(error => {
      response.status(404).json({ error })
    })
})

module.exports = app
