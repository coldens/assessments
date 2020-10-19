import { DomainError } from '../../../shared/domain/domain-error';
import { QuizId } from '../../../shared/domain/value-object/identifier/quiz-id';

export class QuizNotFound extends DomainError {
  constructor(id: QuizId) {
    super(`quiz with id <${id.value}> not found`);
  }
}
