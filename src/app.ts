import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import { v4 as uuid } from 'uuid';
import * as passport from 'passport';
import * as config from 'config';
import cookieSession = require('cookie-session');
import { Google } from './auth';
import { Mongo } from './db';

// iisnode changes the working directory to that of the handler
process.chdir(path.resolve(__dirname + './..'));

Mongo.init();
Google.init();

class App {
    public express: express.Application;

    constructor() {
        this.express = express()
            .use((req, res, next) => { (req as any).id = uuid(); next(); })            
            .use(morgan(config.get('logger.format') as string))
            .use(cookieSession({
                name: 'xyz',
                maxAge: 24*60*60*1000,
                keys: config.get('session.cookie.keys')
            }))
            .use(passport.initialize())
            .use(passport.session())
            .set('view engine', 'ejs')
            .get('/', (req, res) => { res.render('home'); })
            .use('/auth', Google.routes);
        morgan.token('id', (req) => { return (req as any).id; });
    }
}

export default new App().express;