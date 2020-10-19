import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QuizModule } from '../../../contexts/feedback/quiz/infraestructure/quiz.module';
import { QuizPostController } from './quiz-post.controller';

@Module({
  imports: [QuizModule, CqrsModule],
  controllers: [QuizPostController],
})
export class QuizHttpModule {}
