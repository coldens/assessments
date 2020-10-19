import { DomainEvent } from '../../../shared/domain/domain-event';

export class ReplyCreatedEvent extends DomainEvent {
  readonly id: string;
  readonly questionId: string;
  readonly answerId: string;
  readonly correct: boolean;

  constructor({ id, questionId, answerId, correct }) {
    super();

    this.id = id;
    this.questionId = questionId;
    this.answerId = answerId;
    this.correct = correct;
  }
}
