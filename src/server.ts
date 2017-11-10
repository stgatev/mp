import * as http from 'http';
import app from './app';

const config = app.get('config');
const port = config.get('server.port') || 8000;
const server = http.createServer(app);
server.listen(port);
