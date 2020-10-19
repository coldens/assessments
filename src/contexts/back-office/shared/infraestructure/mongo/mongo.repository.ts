import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export abstract class MongoRepository {
  constructor(
    @Inject(Db)
    private db: Db,
  ) {}

  protected abstract moduleName(): string;

  collection() {
    return this.db.collection(this.moduleName());
  }

  protected async persist(document: document): Promise<void> {
    const collection = this.collection();

    await collection.updateOne(
      { _id: document._id },
      { $set: document },
      { upsert: true },
    );
  }
}

type document = {
  _id: string;
};
