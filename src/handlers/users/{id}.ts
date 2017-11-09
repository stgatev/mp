'use strict';

import { UsersRepository as Users } from '../../lib/UsersRepository';

module.exports = {
    get: function users_getById(req, res) {
        res.json(Users.get(req.params['id']))
    }    
};