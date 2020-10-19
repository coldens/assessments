import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { ReplyId } from '../../../../shared/domain/value-object/identifier/reply-id';
import { Uuid } from '../../../../shared/domain/value-object/uuid';
import { FindQuizService } from '../../../quiz/application/find/find-quiz.service';
import { Quiz } from '../../../quiz/domain/quiz';
import { QuizNotFound } from '../../../quiz/domain/quiz-not-found';
import { CorrectAnswer } from '../../domain/correct-answer';
import { Reply } from '../../domain/reply';
import { ReplyRepository } from '../../domain/reply.repository';

@Injectable()
export class SaveReplyService {
  constructor(
    @Inject('REPLY_REPOSITORY')
    private replyRepository: ReplyRepository,
    private findQuizService: FindQuizService,
    private eventBus: EventBus,
  ) {}

  async run(
    id: ReplyId,
    questionId: Uuid,
    answerId: Uuid,
    quizId: QuizId,
    correct: CorrectAnswer,
  ) {
    const quiz = await this.findQuizService.run(quizId);

    this.guardQuizExists(quizId, quiz);

    const reply = Reply.create(id, questionId, answerId, quizId, correct);
    await this.replyRepository.save(reply);
    this.eventBus.publishAll(reply.pullDomainEvents());
  }

  private guardQuizExists(id: QuizId, quiz?: Quiz) {
    if (quiz === null) {
      throw new QuizNotFound(id);
    }
  }
}
