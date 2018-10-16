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
