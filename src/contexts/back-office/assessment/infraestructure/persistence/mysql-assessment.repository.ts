import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentRepository } from '../../domain/assessment.repository';
import { Assessment } from '../../domain/assessment';
import { AssessmentEntity } from './assessment.entity';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';

@Injectable()
export class MysqlAssessmentRepository implements AssessmentRepository {
  constructor(
    @InjectRepository(AssessmentEntity)
    private repository: Repository<AssessmentEntity>,
  ) {}

  async save(assessment: Assessment) {
    await this.repository.save(assessment.toPrimitives());
  }

  async find(id: AssessmentId) {
    const assessment = await this.repository.findOne(id.value);

    if (typeof assessment === 'undefined') {
      return null;
    }

    return Assessment.fromPrimitives(
      assessment.id,
      assessment.unitId,
      assessment.duration,
    );
  }

  async findAll() {
    const assessments = await this.repository.find();
    return assessments.map((a) =>
      Assessment.fromPrimitives(a.id, a.unitId, a.duration),
    );
  }
}
