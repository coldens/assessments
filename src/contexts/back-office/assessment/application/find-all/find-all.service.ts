import { Injectable, Inject } from '@nestjs/common';
import { AssessmentRepository } from '../../domain/assessment.repository';

@Injectable()
export class FindAllService {
  constructor(
    @Inject('ASSESSMENT_REPOSITORY')
    private assessmentRepository: AssessmentRepository,
  ) {}

  async run() {
    const assessments = await this.assessmentRepository.findAll();
    return assessments;
  }
}
