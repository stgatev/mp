import * as mongoose from 'mongoose';
import * as config from 'config';

class Mongo {
    public static init() {
        mongoose.connect(config.get('db.mongo.uri'), () => {
            console.log('Connected to mongodb.');
        });
    }
}

export { Mongo };