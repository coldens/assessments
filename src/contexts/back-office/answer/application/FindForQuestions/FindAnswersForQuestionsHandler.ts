import { QueryHandler } from '@nestjs/cqrs';
import { QuestionId } from '../../../../shared/domain/value-object/identifier/question-id';
import { FindAnswersForQuestionsQuery } from './FindAnswersForQuestionsQuery';
import { FindAnswersForQuestionsService } from './FindAnswersForQuestionsService';

@QueryHandler(FindAnswersForQuestionsQuery)
export class FindAnswersForQuestionsHandler {
  constructor(private service: FindAnswersForQuestionsService) {}

  async execute(query: FindAnswersForQuestionsQuery) {
    const answers = await this.service.run(
      query.questionsId.map((id) => new QuestionId(id)),
    );
    return answers.map((a) => a.toPrimitives());
  }
}
