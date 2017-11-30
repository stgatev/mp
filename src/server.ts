import * as http from 'http';
import app from './app';
import * as config from 'config';

const port = config.get('server.port') || 8000;
const server = http.createServer(app);
server.listen(port);
