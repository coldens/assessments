import { AnswerId } from '../../../shared/domain/value-object/identifier/answer-id';
import { QuestionId } from '../../../shared/domain/value-object/identifier/question-id';
import { QuizId } from '../../../shared/domain/value-object/identifier/quiz-id';
import { ReplyId } from '../../../shared/domain/value-object/identifier/reply-id';
import { CorrectAnswer } from './correct-answer';

export class ReplyCriteria {
  constructor(public conditions: Criteria) {}
}

type Criteria = {
  id?: ReplyId | ReplyId[];
  questionId?: QuestionId | QuestionId[];
  answerId?: AnswerId | AnswerId[];
  quizId?: QuizId | QuizId[];
  correct?: CorrectAnswer | CorrectAnswer[];
};
