import { Question } from './question';

export interface QuestionRepository {
  findByCriteria(criteria): Promise<Question[]>;
}
