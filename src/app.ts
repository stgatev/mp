import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as swaggerize from 'swaggerize-express';
import * as swaggerUi from 'swaggerize-ui';
import { v4 as uuid } from 'uuid';
import * as config from 'config';
import { router as authRouter } from './routers/authRouter';

// iisnode changes the working directory to that of the handler
process.chdir(path.resolve(__dirname + './..'));

class App {
    public express: express.Application;

    constructor() {
        const loggerFormat = config.has('logger.format') ? config.get('logger.format') as string : 'dev';

        this.express = express()
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: false }))

            .use((req, res, next) => { (req as any).id = uuid(); next(); })
            .use(morgan(loggerFormat))

            // Auth routes
            .use('/auth', authRouter)

            .get('/', (req, res) => {
                res.render('home');
            })

            .set('config', config)
            .set('view engine', 'ejs');

        morgan.token('id', (req) => { return (req as any).id; });
    }
}

export default new App().express;