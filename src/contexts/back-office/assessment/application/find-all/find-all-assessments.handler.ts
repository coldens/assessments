import { QueryHandler } from '@nestjs/cqrs';
import { FindAllAssessmentsQuery } from './find-all-assessments.query';
import { FindAllService } from './find-all.service';

@QueryHandler(FindAllAssessmentsQuery)
export class FindAllAssessmentHandler {
  constructor(private findAllService: FindAllService) {}

  async execute() {
    const assessments = await this.findAllService.run();
    return assessments.map((a) => a.toPrimitives());
  }
}
