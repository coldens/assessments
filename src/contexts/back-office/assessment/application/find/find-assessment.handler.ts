import { QueryHandler } from '@nestjs/cqrs';

import { FindAssessmentQuery } from './find-assessment.query';
import { FindAssessmentService } from './find-assessment.service';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';

@QueryHandler(FindAssessmentQuery)
export class FindAssessmentHandler {
  constructor(private findAssessmentService: FindAssessmentService) {}

  async execute(query: FindAssessmentQuery) {
    const assessment = await this.findAssessmentService.run(
      new AssessmentId(query.assessmentId),
    );

    return assessment ? assessment.toPrimitives() : null;
  }
}
