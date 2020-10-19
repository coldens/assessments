import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { ReplyEntity } from './persistence/reply.entity';
import { MysqlReplyRepository } from './persistence/mysql-reply.repository';
import { SaveReplyService } from '../application/save/save-reply.service';
import { CreateQuizService } from '../../quiz/application/create/create-quiz.service';
import { FindQuizHandler } from '../../quiz/application/find/find-quiz.handler';
import { QuizModule } from '../../quiz/infraestructure/quiz.module';

export const queryHandlers = [FindQuizHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ReplyEntity]), CqrsModule, QuizModule],
  providers: [
    { provide: 'REPLY_REPOSITORY', useClass: MysqlReplyRepository },

    // Services
    SaveReplyService,

    // Handlers
    ...queryHandlers,

    CreateQuizService,
  ],
})
export class ReplyModule {}
