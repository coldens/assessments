import { AnswerId } from '../../../shared/domain/value-object/identifier/answer-id';
import { AssessmentId } from '../../../shared/domain/value-object/identifier/assessment-id';
import { QuestionId } from '../../../shared/domain/value-object/identifier/question-id';
import { QuestionContent } from './question-content';

export class QuestionCriteria {
  constructor(public conditions: Criteria) {}
}

type Criteria = {
  id?: QuestionId | QuestionId[];
  content?: QuestionContent | QuestionContent[];
  assessmentId?: AssessmentId | AssessmentId[];
  correctAnswerId?: AnswerId | AnswerId[];
};
