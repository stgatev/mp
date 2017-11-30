import * as mongoose from 'mongoose';
import * as config from 'config';

mongoose.connect(config.get("db.mongo.uri"), () => {
    console.log('Connected to mongodb.');
});