const mongoose = require("mongoose");
const Products = require('../models/product');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('Products', () => {
  beforeEach(done => {Products.remove({}, done);});

  describe('/GET products', () => {
    it('it should GET all the products', (done) => {
      chai.request(server)
          .get('/api/v1/products')
          .end((err, res) => {
            if (err) {
              assert(false, 'err response: ' + err);
              return;
            }
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });
});

//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai