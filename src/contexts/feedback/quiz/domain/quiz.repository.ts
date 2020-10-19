import { Quiz } from './quiz';
import { QuizId } from '../../../shared/domain/value-object/identifier/quiz-id';
import { QuizCriteria } from './quiz-criteria';

export interface QuizRepository {
  save(quiz: Quiz): Promise<void>;
  find(id: QuizId): Promise<Quiz | null>;
  findByCriteria(criteria: QuizCriteria): Promise<Quiz | null>;
}
