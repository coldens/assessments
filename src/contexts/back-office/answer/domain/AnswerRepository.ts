import { Answer } from './answer';
import { AnswerCriteria } from './AnswerCriteria';

export interface AnswerRepository {
  findByCriteria(criteria: AnswerCriteria): Promise<Answer[]>;
}
