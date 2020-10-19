import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindAnswersForQuestionsQuery } from '../../../contexts/back-office/answer/application/FindForQuestions/FindAnswersForQuestionsQuery';
import { FindAssessmentQuery } from '../../../contexts/back-office/assessment/application/find/find-assessment.query';
import { FindQuestionsForAssessmentQuery } from '../../../contexts/back-office/question/application/findForAssessment/FindQuestionsForAssessmentQuery';
import { ContinueQuizQuery } from '../../../contexts/feedback/quiz/application/continue/ContinueQuizQuery';
import { FindRepliesForQuizQuery } from '../../../contexts/feedback/reply/application/FindRepliesForQuiz/FindRepliesForQuizQuery';

@Controller('feedback/quiz')
export class QuizGetController {
  constructor(private queryBus: QueryBus) {}

  @Get(':id')
  async show(@Param('id') id: string) {
    const quiz = await this.queryBus.execute(new ContinueQuizQuery(id));
    const replies = await this.queryBus.execute(
      new FindRepliesForQuizQuery(id),
    );

    const assessment = await this.queryBus.execute(
      new FindAssessmentQuery(quiz.assessmentId),
    );
    const questions: any[] = await this.queryBus.execute(
      new FindQuestionsForAssessmentQuery(assessment.id),
    );
    const answers: any[] = await this.queryBus.execute(
      new FindAnswersForQuestionsQuery(questions.map((q) => q.id)),
    );

    const questionsWithAnswers = questions.map((q) => {
      q.answers = answers.filter((a) => a.questionId === q.id);
      return q;
    });

    return {
      quiz,
      replies,
      assessment,
      questions: questionsWithAnswers,
    };
  }
}
