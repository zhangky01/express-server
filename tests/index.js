'use strict';
const should = require('chai').should();
const app = require('../app');
const request = require('supertest')(app);

describe('default api', () => {
    it('check heath: success', done => {
        request
            .get('/health')
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.code.should.eq(0);
                done();
            });
    });

    it('404: success', done => {
        request
            .get('/health1')
            .expect(200)
            .end((err, res) => {
                should.not.exist(err);
                res.body.code.should.eq(404);
                done();
            });
    });
});