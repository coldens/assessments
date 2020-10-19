import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Bounded contexts
import { BackOfficeModule } from './contexts/back-office/shared/infraestructure/back-office.module';
import { FeedbackModule } from './contexts/feedback/shared/infraestructure/feedback.module';
import { AppController } from './app.controller';

// Applications
import { AssessmentHttpModule } from './apps/back-office/assessment/assessment.http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: 'root',
      password: 'jose1992',
      database: 'assessment',
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Bounded contexts
    BackOfficeModule,
    FeedbackModule,

    // HTTP
    AssessmentHttpModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
