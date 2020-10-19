import { Assessment } from './assessment';
import { AssessmentId } from '../../../shared/domain/value-object/identifier/assessment-id';

export interface AssessmentRepository {
  save(assessment: Assessment): Promise<void>;
  find(id: AssessmentId): Promise<Assessment | null>;
  findAll(): Promise<Assessment[]>;
}
