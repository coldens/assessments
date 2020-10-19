import { Assessment } from '../../../../../src/contexts/back-office/assessment/domain/assessment';
import { AssessmentId } from '../../../../../src/contexts/shared/domain/value-object/identifier/assessment-id';
import { UnitId } from '../../../../../src/contexts/shared/domain/value-object/identifier/unit-id';
import { AssessmentDuration } from '../../../../../src/contexts/back-office/assessment/domain/assessment-duration';

export class AssessmentMother {
  static random() {
    return new Assessment(
      AssessmentId.random(),
      UnitId.random(),
      AssessmentDuration.random(),
    );
  }
}
