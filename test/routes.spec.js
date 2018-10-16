const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
    it('should return the homepage with text', done => {
        chai.request(server)
        .get('/')
        .end((err, response) => {
            response.should.have.status(200);
            response.should.be.html;
            response.res.text.should.equal('Hello, Quantified Self!');
            done();
        });
    });

    it('should return a 404 for a route that does not exist', done => {
        chai.request(server)
        .get('/sad')
        .end((err, response) => {
            response.should.have.status(404);
            done();
        });
    });
});

describe('API Routes', () => {
    before((done) => {
        database.migrate.latest()
          .then(() => done())
          .catch(error => {
            throw error;
          });
      });
    
      beforeEach((done) => {
        database.seed.run()
          .then(() => done())
          .catch(error => {
            throw error;
          });
      });
    
    describe('GET /api/v1/foods', () => {
        it('should return all of the foods', done =>{
            chai.request(server)
                .get('/api/v1/foods')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.should.be.a('array');
                    response.body.length.should.equal(10);
                    response.body[0].should.have.property('name');
                    response.body[0].name.should.equal('eggs');
                    response.body[0].should.have.property('calories');
                    response.body[0].calories.should.equal(100);
                    done();
                });
        });

        describe('POST /api/v1/foods', () => {
            it('should create a new food', done => {
                chai.request(server)
                    .post('/api/v1/foods')
                    .send(
                        {food:
                            {
                                name: 'beans',
                                calories: 300
                            }
                        })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    done();
                });

            });
        });
    });
});