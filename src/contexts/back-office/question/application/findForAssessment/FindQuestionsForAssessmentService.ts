import { Inject, Injectable } from '@nestjs/common';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';
import { Question } from '../../domain/question';
import { QuestionCriteria } from '../../domain/QuestionCriteria';
import { QuestionRepository } from '../../domain/QuestionRepository';

@Injectable()
export class FindQuestionsForAssessmentService {
  constructor(
    @Inject('QuestionRepository')
    private repository: QuestionRepository,
  ) {}

  async run(assessmentId: AssessmentId): Promise<Question[]> {
    const questions = await this.repository.findByCriteria(
      new QuestionCriteria({ assessmentId }),
    );

    return questions;
  }
}
