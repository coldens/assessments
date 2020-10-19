import { QuizId } from '../../../shared/domain/value-object/identifier/quiz-id';
import { Uuid } from '../../../shared/domain/value-object/uuid';
import { QuizAttempt } from './quiz-attempt';
import { QuizTimeLeft } from './quiz-time-left';

export type Fields = {
  id?: QuizId;
  assessmentId?: Uuid;
  studentId?: Uuid;
  attempt?: QuizAttempt;
  timeLeft?: QuizTimeLeft;
};

export type FieldName =
  | 'id'
  | 'assessmentId'
  | 'studentId'
  | 'timeLeft'
  | 'attempt';

export interface QuizCriteria {
  readonly fields: Fields;
  readonly sortBy?: FieldName;
  readonly sortDir?: 'asc' | 'desc';
  readonly startOf?: number;
  readonly take?: number;
}
