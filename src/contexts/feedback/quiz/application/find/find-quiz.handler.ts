import { QueryHandler } from '@nestjs/cqrs';
import { FindQuizQuery } from './find-quiz.query';
import { FindQuizService } from './find-quiz.service';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';

@QueryHandler(FindQuizQuery)
export class FindQuizHandler {
  constructor(private findService: FindQuizService) {}

  async execute(findQuizQuery: FindQuizQuery) {
    const quiz = await this.findService.run(new QuizId(findQuizQuery.quizId));
    return quiz ? quiz.toPrimitives() : null;
  }
}
