import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { QuizId } from '../../../shared/domain/value-object/identifier/quiz-id';
import { QuizCreatedEvent } from './quiz-created.event';
import { QuizTimeLeft } from './quiz-time-left';
import { QuizAttempt } from './quiz-attempt';
import { MerchantId } from '../../../shared/domain/value-object/identifier/merchant-id';
import { AssessmentId } from '../../../shared/domain/value-object/identifier/assessment-id';
import { StudentId } from '../../../shared/domain/value-object/identifier/student-id';

export class Quiz extends AggregateRoot {
  constructor(
    private id: QuizId,
    private assessmentId: AssessmentId,
    private studentId: StudentId,
    private attempt: QuizAttempt,
    private timeLeft: QuizTimeLeft,
    private merchantId: MerchantId,
  ) {
    super();
  }

  static create(
    id: QuizId,
    assessmentId: AssessmentId,
    studentId: StudentId,
    attempt: QuizAttempt,
    timeLeft: QuizTimeLeft,
    merchantId: MerchantId,
  ) {
    const quiz = new Quiz(
      id,
      assessmentId,
      studentId,
      attempt,
      timeLeft,
      merchantId,
    );

    quiz.record(
      new QuizCreatedEvent(
        id.value,
        assessmentId.value,
        studentId.value,
        attempt.value,
        timeLeft.value,
        merchantId.value,
      ),
    );

    return quiz;
  }

  static fromPrimitives(
    id: string,
    assessmentId: string,
    studentId: string,
    attempt: number,
    timeLeft: number,
    merchantId: string,
  ) {
    return new Quiz(
      new QuizId(id),
      new AssessmentId(assessmentId),
      new StudentId(studentId),
      new QuizAttempt(attempt),
      new QuizTimeLeft(timeLeft),
      new MerchantId(merchantId),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      assessmentId: this.assessmentId.value,
      studentId: this.studentId.value,
      attempt: this.attempt.value,
      timeLeft: this.timeLeft.value,
      merchantId: this.merchantId.value,
    };
  }

  subtractTimeLeft(value: number) {
    let result = this.timeLeft.value - value;

    if (result < 0) {
      result = 0;
    }

    this.timeLeft = new QuizTimeLeft(result);
    return this;
  }

  getId(): QuizId {
    return this.id;
  }

  getAssessmentId(): AssessmentId {
    return this.assessmentId;
  }

  getTimeLeft(): QuizTimeLeft {
    return this.timeLeft;
  }

  getAttempt(): QuizAttempt {
    return this.attempt;
  }

  getStudentId(): StudentId {
    return this.studentId;
  }

  getMerchantId(): MerchantId {
    return this.merchantId;
  }
}
