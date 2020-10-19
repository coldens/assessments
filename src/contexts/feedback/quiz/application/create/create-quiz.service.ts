import { Injectable, Inject } from '@nestjs/common';
import { QueryBus, EventBus } from '@nestjs/cqrs';

import { QuizRepository } from '../../domain/quiz.repository';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { Uuid } from '../../../../shared/domain/value-object/uuid';
import { AssessmentNotExists } from '../../domain/assessment-not-exists';
import { Quiz } from '../../domain/quiz';
import { QuizTimeLeft } from '../../domain/quiz-time-left';
import { QuizAlreadyStarted } from '../../domain/quiz-already-started';

import { FindAssessmentQuery } from '../../../../back-office/assessment/application/find/find-assessment.query';
import { QuizAttempt } from '../../domain/quiz-attempt';
import { MerchantId } from '../../../../shared/domain/value-object/identifier/merchant-id';

@Injectable()
export class CreateQuizService {
  constructor(
    @Inject('QUIZ_REPOSITORY')
    private quizRepository: QuizRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async run(
    quizId: QuizId,
    assessmentId: Uuid,
    studentId: Uuid,
    attempt: QuizAttempt,
    merchantId: MerchantId,
  ) {
    const assessment: { duration: number } | null = await this.queryBus.execute(
      new FindAssessmentQuery(assessmentId.value),
    );

    // Verificamos si la evaluación existe (no es null)
    await this.guardIsAssessmentExists(assessment);

    // Verificamos que el alumno ya no haya iniciado la prueba
    await this.guardAlreadyQuizStarted(
      await this.quizRepository.findByCriteria({
        fields: { assessmentId, studentId, attempt },
      }),
    );

    const quiz = Quiz.create(
      quizId,
      assessmentId,
      studentId,
      attempt,
      new QuizTimeLeft(assessment.duration),
      merchantId,
    );

    // persistimos la nueva prueba
    await this.quizRepository.save(quiz);

    // publicamos eventos de la prueba iniciada
    this.eventBus.publishAll(quiz.pullDomainEvents());
  }

  private async guardIsAssessmentExists(assessment: any) {
    if (assessment === null) {
      throw new AssessmentNotExists();
    }
  }

  private async guardAlreadyQuizStarted(quiz?: Quiz) {
    if (quiz !== null) {
      throw new QuizAlreadyStarted();
    }
  }
}
