'use strict';

import { User } from '../models/User';

const jp = require('jsonpath');

const users = require('../../data/users.json');

export class UsersRepository {
    public static get(id): User {
        return jp.query(users, '$..[?(@.id=='+id+')]')[0];
    }
    public static all(): User[] { 
        return users;
    }
};