import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FindQuizService } from '../application/find/find-quiz.service';
import { QuizEntity } from './persistence/quiz.entity';
import { MysqlQuizRepository } from './persistence/mysql-quiz.repository';
import { CreateQuizService } from '../application/create/create-quiz.service';
import { FindQuizHandler } from '../application/find/find-quiz.handler';
import { QuizPostController } from '../../../../apps/feedback/quiz/quiz-post.controller';

export const queryHadlers = [FindQuizHandler];

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity]), CqrsModule],
  providers: [
    {
      provide: 'QUIZ_REPOSITORY',
      useClass: MysqlQuizRepository,
    },

    // Handlers
    ...queryHadlers,

    // App Services
    FindQuizService,
    CreateQuizService,
  ],
  exports: [FindQuizService, CreateQuizService, 'QUIZ_REPOSITORY'],
  controllers: [QuizPostController],
})
export class QuizModule {}
