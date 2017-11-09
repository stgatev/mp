import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET users', () => {
    it('responds with JSON array', () => {
        return chai.request(app).get('/users').then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(3);
        });
    });

    it('should include Trevor Plantagenet', () => {
        return chai.request(app).get('/users/1').then(res => {
            let user = res.body;
            expect(user).to.exist;
            expect(user).to.have.all.keys([
                'id',
                'name'
            ]);
            expect(user.name).to.equal("Trevor Plantagenet");
        });
    });
});

describe('GET users/:id', () => {
    it('responds with single JSON object', () => {
        return chai.request(app).get('/users/1').then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        });
    });

    it('should return Trevor Plantagenet', () => {
        return chai.request(app).get('/users/1').then(res => {
            expect(res.body.name).to.equal('Trevor Plantagenet');
        });
    });
});