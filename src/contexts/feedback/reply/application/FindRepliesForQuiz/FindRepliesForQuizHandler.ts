import { QueryHandler } from '@nestjs/cqrs';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { FindRepliesForQuizQuery } from './FindRepliesForQuizQuery';
import { FindRepliesForQuizService } from './FindRepliesForQuizService';

@QueryHandler(FindRepliesForQuizQuery)
export class FindRepliesForQuizHandler {
  constructor(private service: FindRepliesForQuizService) {}

  async execute(query: FindRepliesForQuizQuery) {
    const replies = await this.service.run(new QuizId(query.quizId));
    return replies.map((r) => r.toPrimitives());
  }
}
