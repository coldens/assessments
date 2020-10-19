import { QueryHandler } from '@nestjs/cqrs';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { ContinueQuizQuery } from './ContinueQuizQuery';
import { ContinueQuizService } from './ContinueQuizService';

@QueryHandler(ContinueQuizQuery)
export class ContinueQuizHandler {
  constructor(private continueQuizService: ContinueQuizService) {}

  execute(query: ContinueQuizQuery) {
    return this.continueQuizService.run(new QuizId(query.quizId));
  }
}
