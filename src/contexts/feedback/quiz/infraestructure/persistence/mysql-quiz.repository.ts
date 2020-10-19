import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuizRepository } from '../../domain/quiz.repository';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { Quiz } from '../../domain/quiz';
import { QuizEntity } from './quiz.entity';
import { QuizCriteria, Fields } from '../../domain/quiz-criteria';

@Injectable()
export class MysqlQuizRepository implements QuizRepository {
  constructor(
    @InjectRepository(QuizEntity)
    private repository: Repository<QuizEntity>,
  ) {}

  async save(quiz: Quiz) {
    await this.repository.save(quiz.toPrimitives());
    return;
  }

  async find(id: QuizId) {
    const result = await this.repository.findOne(id.value);

    if (typeof result === 'undefined') {
      return null;
    }

    return Quiz.fromPrimitives(
      result.id,
      result.assessmentId,
      result.studentId,
      result.attempt,
      result.timeLeft,
      result.merchantId,
    );
  }

  async findByCriteria(criteria: QuizCriteria) {
    const where = this.whereBuilderFromFields(criteria.fields);
    const order = this.orderBuilderFromCriteria(criteria);

    const result = await this.repository.findOne({
      where,
      order,
    });

    return Quiz.fromPrimitives(
      result.id,
      result.assessmentId,
      result.studentId,
      result.attempt,
      result.timeLeft,
      result.merchantId,
    );
  }

  private whereBuilderFromFields(fields: Fields) {
    const where = {};

    Object.keys(fields).forEach((key) => {
      where[key] = fields[key].value;
    });

    return where;
  }

  private orderBuilderFromCriteria(criteria: QuizCriteria) {
    const order = {};

    if (criteria.sortBy) {
      order[criteria.sortBy] = criteria.sortDir;
    }

    return order;
  }
}
