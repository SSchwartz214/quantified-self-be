const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error
      })
  })

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error
      })
  })

  describe('Food Endpoints', () => {
    describe('GET /api/v1/foods/:id', () => {
      it('should return the food with the specified id', done => {
        chai.request(server)
          .get('/api/v1/foods/1')
          .end((error, response) => {
            should.not.exist(error)
            response.should.be.json
            response.should.have.status(200)
            response.body.should.be.an('object')
            response.body.should.have.property('id')
            response.body.id.should.equal(1)
            response.body.should.have.property('name')
            response.body.name.should.equal('eggs')
            response.body.should.have.property('calories')
            response.body.calories.should.equal(100)
            done()
          })
      })

      it('should return a 404 of the food cannot be found', done => {
        chai.request(server)
          .get('/api/v1/foods/124')
          .end((error, response) => {
            response.should.be.json
            response.should.have.status(404)
            done()
          })
      })
    })

    describe('DELETE /api/v1/foods/:id', () => {
      it('should delete the food with the specified id', done => {
        chai.request(server)
          .delete('/api/v1/foods/1')
          .end((error, response) => {
            should.not.exist(error)
            response.should.have.status(204)
            done()
          })
      })
    })

    describe('PATCH /api/v1/foods/:id', () => {
      it('should update the specified food when given valid paramaters', done => {
        chai.request(server)
          .patch('/api/v1/foods/1')
          .send({
            food: {
              name: 'burger',
              calories: 500
            }
          })
          .end((error, response) => {
            should.not.exist(error)
            response.should.have.status(200)
            response.body.should.be.an('object')
            response.body.should.have.property('id')
            response.body.id.should.equal(1)
            response.body.should.have.property('name')
            response.body.name.should.equal('burger')
            response.body.should.have.property('calories')
            response.body.calories.should.equal(500)
            done()
          })
      })
    })
  })

  describe('Meal Endpoints', () => {
    describe('GET /api/v1/meals', () => {
      it('should return all meals', done => {
        chai.request(server)
          .get('/api/v1/meals')
          .end((error, response) => {
            should.not.exist(error)
            response.should.be.json
            response.should.have.status(200)
            response.body.should.be.an('array')
            response.body.length.should.equal(4)
            response.body[0].should.have.property('id')
            response.body[0].id.should.equal(1)
            response.body[0].should.have.property('name')
            response.body[0].name.should.equal('Breakfast')
            response.body[0].should.have.property('foods')
            response.body[0].foods.should.be.an('array')
            response.body[0].foods[0].should.have.property('id')
            response.body[0].foods[0].id.should.equal(9)
            response.body[0].foods[0].should.have.property('name')
            response.body[0].foods[0].name.should.equal('tomatoes')
            response.body[0].foods[0].should.have.property('calories')
            response.body[0].foods[0].calories.should.equal(25)
            done()
          })
      })
    })

    describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
      it('should add the specified food to the specified meal', done => {
        chai.request(server)
          .post('/api/v1/meals/1/foods/1')
          .end((error, response) => {
            should.not.exist(error)
            response.should.be.json
            response.should.have.status(201)
            response.body.should.have.property('message')
            response.body.message.should.equal('Successfully added eggs to Breakfast')
            done()
          })
      })
    })
  })
})
