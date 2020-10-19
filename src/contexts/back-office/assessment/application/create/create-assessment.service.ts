import { Injectable, Inject } from '@nestjs/common';
import { AssessmentRepository } from '../../domain/assessment.repository';
import { EventBus } from '@nestjs/cqrs';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';
import { UnitId } from '../../../../shared/domain/value-object/identifier/unit-id';
import { AssessmentDuration } from '../../domain/assessment-duration';
import { Assessment } from '../../domain/assessment';

@Injectable()
export class CreateAssessmentService {
  constructor(
    @Inject('ASSESSMENT_REPOSITORY')
    private assessmentRepository: AssessmentRepository,
    private eventBus: EventBus,
  ) {}

  async run(id: AssessmentId, unitId: UnitId, duration: AssessmentDuration) {
    const assessment = Assessment.create(id, unitId, duration);

    await this.assessmentRepository.save(assessment);
    this.eventBus.publishAll(assessment.pullDomainEvents());
  }
}
