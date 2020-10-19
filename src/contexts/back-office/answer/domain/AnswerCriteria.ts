import { AnswerId } from '../../../shared/domain/value-object/identifier/answer-id';
import { QuestionId } from '../../../shared/domain/value-object/identifier/question-id';
import { AnswerContent } from './answer-content';

export class AnswerCriteria {
  constructor(public conditions: Criteria) {}
}

type Criteria = {
  id?: AnswerId | AnswerId[];
  content?: AnswerContent | AnswerContent[];
  questionId?: QuestionId | QuestionId[];
};
