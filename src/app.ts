import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as swaggerize from 'swaggerize-express';
import * as swaggerUi from 'swaggerize-ui';
import * as uuid from 'uuid';
import * as config from 'config';

// iisnode changes the working directory to that of the handler
process.chdir(path.resolve(__dirname + './..'));

class App {
    public express: express.Application;

    constructor() {
        this.express = express()
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: false }))

            .set('config', config)

            .use((req, res, next) => { (req as any).id = uuid.v4(); next(); })
            .use(morgan(config.has('logger.format') ? config.get('logger.format') as string : 'dev'))

            // REST handlers
            .use(swaggerize({
                api: path.resolve('./spec/api.json'),
                handlers: path.resolve('./dist/handlers'),
                docspath: '/swagger/docs'
            }))

            // Static content
            .use('/data', express.static('data'))

            // API spec
            .use('/swagger', swaggerUi({
                docs: '/swagger/docs'
            }));

        morgan.token('id', (req) => { return (req as any).id; });
    }
}

export default new App().express;