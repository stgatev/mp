import * as http from 'http';
import app from './app';

const config = app.get('config');
const port = process.env.PORT || config.get('server.port');
const server = http.createServer(app);
server.listen(port);
