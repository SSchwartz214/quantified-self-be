<<<<<<< HEAD
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self';

app.get('/', (request, response) => {
    response.send('Hello, Quantified Self!');
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/foods', (request, response) => {
    database('foods').select()
    .then((foods) => {
        response.status(200).json(foods);
    })
    .catch((error) => {
        response.status(500).json({ error});
    });
});

app.post('/api/v1/foods', (request, response) => {
    const rawFood = request.body

    for (let requiredParameter of ['name', 'calories']) {
            if (!rawFood.food[requiredParameter]) {
                    return response
                        .status(422)
                        .send({ error: `Expected format: {food: { name: <String>, calories: <Integer> }.  You're missing a "${requiredParameter}" property.`});
                };
            };

        database('foods').insert(rawFood.food, 'id')
            .then((food) => {
        response.status(201).json({ id: food })
    })
    .catch(error => {
        response.status(500).json({ error });
    });

});

module.exports = app;
=======
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
    .then((meal) => {
      targetMeal = meal
      return database('foods').where('id', foodId).first()
    })
    .then((food) => {
      targetFood = food
    })
    .then(() => {
      if (targetMeal && targetFood) {
        database('meal_foods').insert({ meal_id: mealId, food_id: foodId })
      }
    })
    .then(() => {
      response.status(201).json({ message: `Successfully added ${targetFood.name} to ${targetMeal.name}` })
    })
    .catch((error) => {
      response.status(400).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
>>>>>>> ff0366f9f285f7277763dd1d02588e944dc5b0f8
