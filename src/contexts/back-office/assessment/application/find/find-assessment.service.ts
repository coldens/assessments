import { Injectable, Inject } from '@nestjs/common';

import { AssessmentRepository } from '../../domain/assessment.repository';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';

@Injectable()
export class FindAssessmentService {
  constructor(
    @Inject('ASSESSMENT_REPOSITORY')
    private assessmentRepository: AssessmentRepository,
  ) {}

  run(assessmentId: AssessmentId) {
    return this.assessmentRepository.find(assessmentId);
  }
}
