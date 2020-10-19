import { Module } from '@nestjs/common';
import { AssessmentModule } from '../../assessment/infraestructure/assessment.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [MongoModule, AssessmentModule],
  exports: [MongoModule],
})
export class BackOfficeModule {}
