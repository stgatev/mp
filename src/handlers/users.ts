'use strict';

import { UsersRepository as Users } from '../lib/UsersRepository';

module.exports = {
    get: function users_get(req, res) {
        res.json(Users.all())
    }
};