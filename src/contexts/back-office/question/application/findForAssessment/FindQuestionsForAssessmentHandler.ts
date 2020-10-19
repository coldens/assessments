import { QueryHandler } from '@nestjs/cqrs';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';
import { FindQuestionsForAssessmentQuery } from './FindQuestionsForAssessmentQuery';
import { FindQuestionsForAssessmentService } from './FindQuestionsForAssessmentService';

@QueryHandler(FindQuestionsForAssessmentQuery)
export class FindQuestionsForAssessmentHandler {
  constructor(private service: FindQuestionsForAssessmentService) {}

  async execute(query: FindQuestionsForAssessmentQuery) {
    const questions = await this.service.run(
      new AssessmentId(query.assessmentId),
    );

    return questions.map((q) => q.toPrimitives());
  }
}
