import { Quiz } from '../../../../../src/contexts/feedback/quiz/domain/quiz';
import { QuizAttempt } from '../../../../../src/contexts/feedback/quiz/domain/quiz-attempt';
import { QuizTimeLeft } from '../../../../../src/contexts/feedback/quiz/domain/quiz-time-left';
import { AssessmentId } from '../../../../../src/contexts/shared/domain/value-object/identifier/assessment-id';
import { MerchantId } from '../../../../../src/contexts/shared/domain/value-object/identifier/merchant-id';
import { QuizId } from '../../../../../src/contexts/shared/domain/value-object/identifier/quiz-id';
import { StudentId } from '../../../../../src/contexts/shared/domain/value-object/identifier/student-id';

export class QuizMother {
  static random(params: randomParams = {}): Quiz {
    const toCreate = {
      id: QuizId.random().value,
      assessmentId: AssessmentId.random().value,
      studentId: StudentId.random().value,
      attempt: QuizAttempt.random().value,
      timeLeft: QuizTimeLeft.random().value,
      merchantId: MerchantId.random().value,
    };

    Object.keys(params).forEach((key) => {
      toCreate[key] = params[key];
    });

    return Quiz.fromPrimitives(
      toCreate.id,
      toCreate.assessmentId,
      toCreate.studentId,
      toCreate.attempt,
      toCreate.timeLeft,
      toCreate.merchantId,
    );
  }
}

type randomParams = {
  id?: string;
  assessmentId?: string;
  studentId?: string;
  quizAttempt?: number;
  quizTimeLeft?: number;
  merchantId?: string;
};
