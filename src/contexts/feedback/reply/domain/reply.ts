import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { AnswerId } from '../../../shared/domain/value-object/identifier/answer-id';
import { QuestionId } from '../../../shared/domain/value-object/identifier/question-id';
import { QuizId } from '../../../shared/domain/value-object/identifier/quiz-id';
import { ReplyId } from '../../../shared/domain/value-object/identifier/reply-id';
import { CorrectAnswer } from './correct-answer';
import { ReplyCreatedEvent } from './reply-created.event';

export class Reply extends AggregateRoot {
  constructor(
    private id: ReplyId,
    private questionId: QuestionId,
    private answerId: AnswerId,
    private quizId: QuizId,
    private correct: CorrectAnswer,
  ) {
    super();
  }

  static create(
    id: ReplyId,
    questionId: QuestionId,
    answerId: AnswerId,
    quizId: QuizId,
    correct: CorrectAnswer,
  ) {
    const reply = new Reply(id, questionId, answerId, quizId, correct);
    reply.record(new ReplyCreatedEvent(reply.toPrimitives()));
    return reply;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      questionId: this.questionId.value,
      answerId: this.answerId.value,
      quizId: this.quizId.value,
      correct: this.correct.value,
    };
  }

  static fromPrimitives(
    id: string,
    questionId: string,
    answerId: string,
    quizId: string,
    correct: boolean,
  ) {
    return new Reply(
      new ReplyId(id),
      new QuestionId(questionId),
      new AnswerId(answerId),
      new QuizId(quizId),
      new CorrectAnswer(correct),
    );
  }

  getId() {
    return this.id;
  }

  getQuizId() {
    return this.quizId;
  }

  getQuestionId() {
    return this.questionId;
  }

  getAnswerId() {
    return this.answerId;
  }

  getCorrect() {
    return this.correct;
  }
}
