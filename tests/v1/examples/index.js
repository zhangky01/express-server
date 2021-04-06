'use strict';
const should = require('chai').should();
const resCodes = require('../../../lib/response-code');
const app = require('../../../app');
const baseURI = '/v1/examples';
const request = require('supertest')(app);
describe('examples GET /v1/examples', () => {
    it('success', done => {
        request
            .get(baseURI)
            .send()
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.code.should.eq(resCodes.SUCCESS);
                done();
            });
    });
});