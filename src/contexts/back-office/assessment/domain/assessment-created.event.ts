import { DomainEvent } from '../../../shared/domain/domain-event';

export class AssessmentCreatedEvent extends DomainEvent {
  readonly id: string;
  readonly unitId: number;
  readonly duration: string;

  constructor({ id, unitId, duration }) {
    super();

    this.id = id;
    this.unitId = unitId;
    this.duration = duration;
  }
}
