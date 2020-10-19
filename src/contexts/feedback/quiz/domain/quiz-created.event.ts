import { DomainEvent } from '../../../shared/domain/domain-event';

export class QuizCreatedEvent extends DomainEvent {
  constructor(
    readonly quizId: string,
    readonly assessmentId: string,
    readonly studentId: string,
    readonly attempt: number,
    readonly timeLeft: number,
    readonly merchantId: string,
  ) {
    super();
  }
}
