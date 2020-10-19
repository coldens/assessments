import { Inject, Injectable } from '@nestjs/common';
import { QuizId } from '../../../../shared/domain/value-object/identifier/quiz-id';
import { ReplyRepository } from '../../domain/reply.repository';
import { ReplyCriteria } from '../../domain/ReplyCriteria';

@Injectable()
export class FindRepliesForQuizService {
  constructor(
    @Inject('ReplyRepository')
    private repository: ReplyRepository,
  ) {}

  async run(quizId: QuizId) {
    const replies = await this.repository.findByCriteria(
      new ReplyCriteria({ quizId }),
    );
    return replies;
  }
}
