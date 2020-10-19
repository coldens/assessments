import { CommandHandler } from '@nestjs/cqrs';
import { CreateQuizCommand } from './create-quiz.command';
import { CreateQuizService } from './create-quiz.service';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { Uuid } from '../../../../shared/domain/value-object/uuid';
import { QuizAttempt } from '../../domain/quiz-attempt';
import { MerchantId } from '../../../../shared/domain/value-object/identifier/merchant-id';

@CommandHandler(CreateQuizCommand)
export class CreateQuizHandler {
  constructor(private createQuizService: CreateQuizService) {}

  async execute(command: CreateQuizCommand): Promise<void> {
    await this.createQuizService.run(
      new QuizId(command.quizId),
      new Uuid(command.assessmentId),
      new Uuid(command.studentId),
      new QuizAttempt(command.attempt),
      new MerchantId(command.merchantId),
    );
  }
}
