import { Injectable } from '@nestjs/common';
import { AssessmentId } from '../../../../../shared/domain/value-object/identifier/assessment-id';
import { MongoRepository } from '../../../../shared/infraestructure/mongo/mongo.repository';
import { Assessment } from '../../../domain/assessment';
import { AssessmentRepository } from '../../../domain/assessment.repository';

@Injectable()
export class MongoAssessmentRepository extends MongoRepository
  implements AssessmentRepository {
  protected moduleName() {
    return 'assessments';
  }

  async find(id: AssessmentId): Promise<Assessment | null> {
    const result = await this.collection().findOne({ _id: id.value });

    if (!result) {
      return null;
    }

    return this.parseToAssessment(result);
  }

  async findAll(): Promise<Assessment[]> {
    const result = await this.collection()
      .find()
      .toArray();

    return result.map(this.parseToAssessment);
  }

  async save(assessment: Assessment): Promise<void> {
    await this.persist(this.parseToDocument(assessment));
  }

  private parseToAssessment(result: any) {
    return Assessment.fromPrimitives(
      result._id,
      result.unitId,
      result.duration,
    );
  }

  private parseToDocument(assessment: Assessment) {
    return {
      _id: assessment.getId().value,
      unitId: assessment.getUnitId().value,
      duration: assessment.getDuration().value,
    };
  }
}
