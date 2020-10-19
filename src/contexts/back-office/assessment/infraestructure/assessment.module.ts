import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/mongo.module';
import { CreateAssessmentHandler } from '../application/create/create-assessment.handler';
import { CreateAssessmentService } from '../application/create/create-assessment.service';
import { FindAllAssessmentHandler } from '../application/find-all/find-all-assessments.handler';
import { FindAllService } from '../application/find-all/find-all.service';
import { FindAssessmentHandler } from '../application/find/find-assessment.handler';
import { FindAssessmentService } from '../application/find/find-assessment.service';
import { MongoAssessmentRepository } from './persistence/mongo/mongo.assessment.repository';

export const queryHandlers = [FindAllAssessmentHandler, FindAssessmentHandler];
export const commandHandlers = [CreateAssessmentHandler];

@Module({
  imports: [CqrsModule, MongoModule],
  providers: [
    { provide: 'ASSESSMENT_REPOSITORY', useClass: MongoAssessmentRepository },
    ...queryHandlers,
    ...commandHandlers,

    // App Services
    CreateAssessmentService,
    FindAllService,
    FindAssessmentService,
  ],
})
export class AssessmentModule {}
