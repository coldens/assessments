import { AssessmentId } from '../../../shared/domain/value-object/identifier/assessment-id';
import { AssessmentCreatedEvent } from './assessment-created.event';
import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { AssessmentDuration } from './assessment-duration';
import { UnitId } from '../../../shared/domain/value-object/identifier/unit-id';

export class Assessment extends AggregateRoot {
  constructor(
    private id: AssessmentId,
    private unitId: UnitId,
    private duration: AssessmentDuration,
  ) {
    super();
  }

  static create(
    id: AssessmentId,
    unitId: UnitId,
    duration: AssessmentDuration,
  ) {
    const assessment = new Assessment(id, unitId, duration);
    assessment.record(new AssessmentCreatedEvent(assessment.toPrimitives()));
    return assessment;
  }

  static fromPrimitives(id: string, unitId: number, duration: number) {
    return new Assessment(
      new AssessmentId(id),
      new UnitId(unitId),
      new AssessmentDuration(duration),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      unitId: this.unitId.value,
      duration: this.duration.value,
    };
  }

  getId() {
    return this.id;
  }

  getUnitId() {
    return this.unitId;
  }

  getDuration() {
    return this.duration;
  }
}
