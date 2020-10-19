import { Inject, Injectable } from '@nestjs/common';
import { QuestionId } from '../../../../shared/domain/value-object/identifier/question-id';
import { Answer } from '../../domain/answer';
import { AnswerCriteria } from '../../domain/AnswerCriteria';
import { AnswerRepository } from '../../domain/AnswerRepository';

@Injectable()
export class FindAnswersForQuestionsService {
  constructor(
    @Inject('AnswerRepository')
    private repository: AnswerRepository,
  ) {}

  async run(questionId: QuestionId[]): Promise<Answer[]> {
    const answers = await this.repository.findByCriteria(
      new AnswerCriteria({ questionId }),
    );
    return answers;
  }
}
