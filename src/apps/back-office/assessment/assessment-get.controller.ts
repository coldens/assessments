import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAllAssessmentsQuery } from '../../../contexts/back-office/assessment/application/find-all/find-all-assessments.query';
import { FindAssessmentQuery } from '../../../contexts/back-office/assessment/application/find/find-assessment.query';

@Controller('back-office/assessments')
export class AssessmentGetController {
  constructor(private queryBus: QueryBus) {}

  @Get('/')
  index() {
    return this.queryBus.execute(new FindAllAssessmentsQuery());
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.queryBus.execute(new FindAssessmentQuery(id));
  }
}
