import { Inject, Injectable } from '@nestjs/common';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { QuizNotFound } from '../../domain/quiz-not-found';
import { QuizRepository } from '../../domain/quiz.repository';

@Injectable()
export class ContinueQuizService {
  constructor(
    @Inject('QUIZ_REPOSITORY')
    private quizRepository: QuizRepository,
  ) {}

  async run(quizId: QuizId) {
    const quiz = await this.quizRepository.find(quizId);

    if (quiz === null) {
      throw new QuizNotFound(quizId);
    }

    return quiz;
  }
}
