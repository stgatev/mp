'use strict';
import * as mocha from 'mocha';
import * as chai from 'chai';
import { UsersRepository as Users } from '../../src/lib/usersRepository';

const expect = chai.expect;

describe('UsersRepository test', () => {
    it('all() should return a json array, length is 3 for current data ', () => {
        let allUsers = Users.all();
        expect(Object.keys(allUsers)).to.have.length(3);
    });

    it('users(id) should return an object', () => {
        let user = Users.get(1);
        expect(user).to.be.an('object');
    });

    it('users(1) should return Trevor Plantagenet', () => {
        let trevor = Users.get(1);
        expect(trevor.name).to.be.a('string', 'Trevor Plantagenet');
    });
});