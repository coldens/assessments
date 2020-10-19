import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReplyEntity } from './reply.entity';
import { ReplyRepository } from '../../domain/reply.repository';
import { ReplyId } from '../../../../shared/domain/value-object/identifier/reply-id';
import { Reply } from '../../domain/reply';

@Injectable()
export class MysqlReplyRepository implements ReplyRepository {
  constructor(
    @InjectRepository(ReplyEntity)
    private replyRepository: Repository<ReplyEntity>,
  ) {}

  async save(reply: Reply) {
    await this.replyRepository.save(reply.toPrimitives());
  }

  async find(id: ReplyId) {
    const result = await this.replyRepository.findOne(id.value);

    if (typeof result === 'undefined') {
      return null;
    }

    return Reply.fromPrimitives(
      result.id,
      result.questionId,
      result.answerId,
      result.quizId,
      result.correct,
    );
  }
}
