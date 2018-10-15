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
          .end((err, response) => {
            response.should.have.status(200)
            response.should.be.json
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
    })
  })

  describe('Meal Endpoints', () => {
    describe('GET /api/v1/meals', () => {
      it('should return all meals', done => {
        chai.request(server)
          .get('/api/v1/meals')
          .end((err, response) => {
            response.should.have.status(200)
            response.should.be.json
            response.body.should.be.an('array')
            response.body.length.should.equal(4)
            response.body[0].should.have.property('id')
            response.body[0].id.should.equal(1)
            response.body[0].should.have.property('name')
            response.body[0].name.should.equal('Breakfast')
            done()
          })
      })
    })
  })
})
