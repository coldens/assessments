import { Injectable, Inject } from '@nestjs/common';
import { QuizRepository } from '../../domain/quiz.repository';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';

@Injectable()
export class FindQuizService {
  constructor(
    @Inject('QUIZ_REPOSITORY')
    private quizRepository: QuizRepository,
  ) {}

  run(quizId: QuizId) {
    return this.quizRepository.find(quizId);
  }
}
