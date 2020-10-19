import { FactoryProvider } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import config from '../config.database';

export const mongoProvider: FactoryProvider = {
  provide: Db,
  useFactory: async () => {
    // Connection URL
    const uri = config.uri;

    // Database Name
    const dbName = config.database;

    // Use connect method to connect to the server
    const client = await MongoClient.connect(uri);

    return client.db(dbName);
  },
};
