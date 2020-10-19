import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { AnswerId } from '../../../shared/domain/value-object/identifier/answer-id';
import { QuestionId } from '../../../shared/domain/value-object/identifier/question-id';
import { AnswerContent } from './answer-content';

export class Answer extends AggregateRoot {
  constructor(
    readonly id: AnswerId,
    readonly content: AnswerContent,
    readonly questionId: QuestionId,
  ) {
    super();
  }

  static fromPrimitives(id: string, content: string, questionId: string) {
    return new Answer(
      new AnswerId(id),
      new AnswerContent(content),
      new QuestionId(questionId),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      content: this.content.value,
      questionId: this.questionId.value,
    };
  }
}
