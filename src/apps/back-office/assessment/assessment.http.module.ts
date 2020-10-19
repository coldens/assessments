import { Module } from '@nestjs/common';
import { AssessmentModule } from '../../../contexts/back-office/assessment/infraestructure/assessment.module';
import { AssessmentPostController } from './assessment-post.controller';
import { AssessmentGetController } from './assessment-get.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [AssessmentModule, CqrsModule],
  controllers: [AssessmentGetController, AssessmentPostController],
})
export class AssessmentHttpModule {}
