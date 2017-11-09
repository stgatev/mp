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
        this.express = express();
        this.express.set('config', config);
        this.express.use((req, res, next) => { (req as any).id = uuid.v4(); next(); });
        this.express.use(morgan(config.has('logger.format') ? config.get('logger.format') as string : 'dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));

        this.express.use(swaggerize({
            api: path.resolve('./spec/api.json'),
            handlers: path.resolve('./dist/handlers'),
            docspath: '/swagger/docs/v1'
        }));

        this.express.use('/swagger', swaggerUi({
            docs: '/swagger/docs/v1'
        }));

        morgan.token('id', (req) => { return (req as any).id; });
    }
}

export default new App().express;