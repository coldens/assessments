import { QuestionId } from '../../../shared/domain/value-object/identifier/question-id';
import { QuestionContent } from './question-content';
import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { AssessmentId } from '../../../shared/domain/value-object/identifier/assessment-id';
import { AnswerId } from '../../../shared/domain/value-object/identifier/answer-id';

export class Question extends AggregateRoot {
  constructor(
    private id: QuestionId,
    private content: QuestionContent,
    private assessmentId: AssessmentId,
    private correctAnswerId?: AnswerId,
  ) {
    super();
  }

  static fromPrimitives(
    id: string,
    content: string,
    assessmentId: string,
    correctAnswerId: string,
  ) {
    return new Question(
      new QuestionId(id),
      new QuestionContent(content),
      new AssessmentId(assessmentId),
      new AnswerId(correctAnswerId),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      content: this.content.value,
      assessmentId: this.assessmentId.value,
      correctAnswerId: this.correctAnswerId.value,
    };
  }
}
