import { Reply } from '../../../../../src/contexts/feedback/reply/domain/reply';
import { ReplyId } from '../../../../../src/contexts/shared/domain/value-object/identifier/reply-id';
import { Uuid } from '../../../../../src/contexts/shared/domain/value-object/uuid';
import { QuizId } from '../../../../../src/contexts/shared/domain/value-object/identifier/quiz-id';
import { CorrectAnswer } from '../../../../../src/contexts/feedback/reply/domain/correct-answer';

export class ReplyMother {
  static random(): Reply {
    return new Reply(
      ReplyId.random(),
      Uuid.random(),
      Uuid.random(),
      QuizId.random(),
      CorrectAnswer.random(),
    );
  }
}
