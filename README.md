# Quantified Self Back-end

## Description

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

## API Endpoints

### Foods

* GET /api/v1/foods

  * Returns all foods currently in the database

```
   {
    "id": 1,
    "name": "Banana",
    "calories": 150
    },
    {
    "id": 2,
    "name": "Chicken",
    "calories": 250
    },
```

* GET /api/v1/foods/:id
   * Returns the food object with the specific :id you’ve passed in
   
   ```
   {
    "id": 1,
    "name": "Banana",
    "calories": 150
    }
  ```
  
* POST /api/v1/foods
   * Allows creating a new food with the parameters
   
   ```
   example parameters:
   { "food": { "name": "Name of food here", "calories": "Calories here"} }
   ```
   
* PATCH /api/v1/foods/:id
  * Allows one to update an existing food with the parameter
    * example parameters:
```    
  { "food": { "name": "Mint", "calories": "14"} }
```

* DELETE /api/v1/foods/:id
  * Will delete the food with the id passed in

### Meals

* GET /api/v1/meals
   * Returns all the meals in the database along with their associated foods
 ```
   [
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    },
```

* GET /api/v1/meals/:meal_id/foods
   * Returns all the foods associated with the meal with an id specified by :meal_id
   
```   
   {
    "id": 1,
    "name": "Breakfast",
    "foods": [
        {
            "id": 1,
            "name": "Banana",
            "calories": 150
        },
        {
            "id": 6,
            "name": "Yogurt",
            "calories": 550
        },
        {
            "id": 12,
            "name": "Apple",
            "calories": 220
        }
    ]
}
```

* POST /api/v1/meals/:meal_id/foods/:id
   * Adds the food with :id to the meal with :meal_id


* DELETE /api/v1/meals/:meal_id/foods/:id
   * Removes the food with :id from the meal with :meal_id

## Contributors

* Colin: https://github.com/colinwarmstrong
* Seth: https://github.com/SSchwartz214
