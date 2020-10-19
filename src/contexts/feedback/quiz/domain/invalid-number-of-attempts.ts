import { InvalidArgumentError } from '../../../shared/domain/value-object/invalid-argument-error';
import { QuizAttempt } from './quiz-attempt';

export class InvalidNumberOfAttempts extends InvalidArgumentError {
  constructor() {
    super(
      `El número máximo de intentos permitidos por evaluación es ${QuizAttempt.MAX_NUMBER_OF_ATTEMPT}`,
    );
  }
}
