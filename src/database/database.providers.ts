import * as mongoose from 'mongoose';
import * as dbConfig from './db_config.json';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://localhost:27017/parley');
        },
    },
];