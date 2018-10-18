### Quantified Self Back-end

#### Description

Quantified Self is a web application that tracks calories in meals that the user eats.  A user can add individual foods to a master list and then add any combination of those foods to a meal to calculate the total amount of calories consumed.  The user can also generate recipes using the Yummly API.  This is the back-end API of the app.  To view the front-end please visit: https://github.com/SSchwartz214/quantified-self-fe


## To view in production, visit:

https://quantified-self-express-be.herokuapp.com/

## Initial Setup

1. Clone this repository 

  ```shell
  git clone https://github.com/SSchwartz214/quantified-self-be.git
  ```
  
2. Change into the `quantified-self-be` directory

3. Install dependencies

  ```shell
  npm install
  ```

## Running the Server Locally

To see the code in action locally, you need to fire up a development server. Use the command:

```shell
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:3000/` to run the application.

## To run the test suite
  
  ```shell
  mocha --exit
  ```

## Record Endpoints:

### Foods

* GET /api/v1/foods

```
Returns all foods currently in the database<br/>
example:<br/>
   {<br/>
    "id": 1,<br/>
    "name": "Banana",<br/>
    "calories": 150<br/>
    },<br/>
    {<br/>
    "id": 2,<br/>
    "name": "Chicken",<br/>
    "calories": 250<br/>
    },<br/>
```

GET /api/v1/foods/:id
```
   * Returns the food object with the specific :id you’ve passed in<br/>
   example:<br/>
   {<br/>
    "id": 1,<br/>
    "name": "Banana",<br/>
    "calories": 150<br/>
    }<br/>
```
POST /api/v1/foods
```
   * Allows creating a new food with the parameters<br/>
   example parameters:<br/>
   { "food": { "name": "Name of food here", "calories": "Calories here"} }<br/>
```
PATCH /api/v1/foods/:id
```
  * Allows one to update an existing food with the parameters<br/>
  example parameters:<br/>
  { "food": { "name": "Mint", "calories": "14"} }
```
DELETE /api/v1/foods/:id
```
  * Will delete the food with the id passed in

#### Meals
```
GET /api/v1/meals
```
   * Returns all the meals in the database along with their associated foodsexample:<br>
   example:<br/>
   [<br/>
    {<br/>
        "id": 1,<br/>
        "name": "Breakfast",<br/>
        "foods": [<br/>
            {<br/>
                "id": 1,<br/>
                "name": "Banana",<br/>
                "calories": 150<br/>
            },<br/>
            {<br/>
                "id": 6,<br/>
                "name": "Yogurt",<br/>
                "calories": 550<br/>
            },<br/>
            {<br/>
                "id": 12,<br/>
                "name": "Apple",<br/>
                "calories": 220<br/>
            }<br/>
        ]<br/>
    },<br/>
    {<br/>
        "id": 2,<br/>
        "name": "Snack",<br/>
        "foods": [<br/>
            {<br/>
                "id": 1,<br/>
                "name": "Banana",<br/>
                "calories": 150<br/>
            },<br/>
            {<br/>
                "id": 9,<br/>
                "name": "Gum",<br/>
                "calories": 50<br/>
            },<br/>
            {<br/>
                "id": 10,<br/>
                "name": "Cheese",<br/>
                "calories": 400<br/>
            }<br/>
        ]<br/>
    },<br/>
```
GET /api/v1/meals/:meal_id/foods
```
   * Returns all the foods associated with the meal with an id specified by :meal_id<br/>
   example:<br/>
   {<br/>
    "id": 1,<br/>
    "name": "Breakfast",<br/>
    "foods": [<br/>
        {<br/>
            "id": 1,<br/>
            "name": "Banana",<br/>
            "calories": 150<br/>
        },<br/>
        {<br/>
            "id": 6,<br/>
            "name": "Yogurt",<br/>
            "calories": 550<br/>
        },<br/>
        {<br/>
            "id": 12,<br/>
            "name": "Apple",<br/>
            "calories": 220<br/>
        }<br/>
    ]<br/>
}<br/>
```
POST /api/v1/meals/:meal_id/foods/:id
```
   * Adds the food with :id to the meal with :meal_id
```
DELETE /api/v1/meals/:meal_id/foods/:id
```
   * Removes the food with :id from the meal with :meal_id

#### Favorite Foods
```
GET /api/v1/favorite_foods
```
  * Retrieves data on the foods which were eaten most frequently.<br/>
  example:<br/>
  [<br/>
  {<br/>
    "timesEaten": 4,<br/>
    "foods":<br/>
      [<br/>
        {<br/>
          "name": "Banana",<br/>
          "calories": 200,<br/>
          "mealsWhenEaten": ["Breakfast", "Dinner"]<br/>
        },<br/>
  },

#### Questions or comments?

Please contact me at:

* Seth: https://github.com/SSchwartz214
