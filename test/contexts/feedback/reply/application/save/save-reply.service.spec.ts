import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { SaveReplyService } from '../../../../../../src/contexts/feedback/reply/application/save/save-reply.service';
import { FindQuizService } from '../../../../../../src/contexts/feedback/quiz/application/find/find-quiz.service';
import { QuizId } from '../../../../../../src/contexts/shared/domain/value-object/identifier/quiz-id';
import { ReplyRepository } from '../../../../../../src/contexts/feedback/reply/domain/reply.repository';
import { QuizRepository } from '../../../../../../src/contexts/feedback/quiz/domain/quiz.repository';
import { Reply } from '../../../../../../src/contexts/feedback/reply/domain/reply';
import { QuizMother } from '../../../quiz/domain/quiz.mother';
import { ReplyMother } from '../../domain/ReplyMother';

describe('SaveReplyService', () => {
  let saveReplyService: SaveReplyService;
  let replyRepository: ReplyRepository;
  let quizRepository: QuizRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'REPLY_REPOSITORY',
          useFactory: () => ({
            save: jest.fn(),
          }),
        },
        {
          provide: 'QUIZ_REPOSITORY',
          useFactory: () => ({
            find: jest.fn(),
          }),
        },
        FindQuizService,
        SaveReplyService,
      ],
    }).compile();

    saveReplyService = module.get<SaveReplyService>(SaveReplyService);
    replyRepository = module.get<ReplyRepository>('REPLY_REPOSITORY');
    quizRepository = module.get<QuizRepository>('QUIZ_REPOSITORY');
  });

  it('should be defined', () => {
    expect(saveReplyService).toBeDefined();
  });

  it('should be reply created', async () => {
    const givenQuiz = QuizMother.random();
    const givenReply = ReplyMother.random();

    jest
      .spyOn(replyRepository, 'save')
      .mockImplementationOnce((reply: Reply) => {
        expect(reply.toPrimitives()).toMatchObject(givenReply.toPrimitives());
        return Promise.resolve();
      });

    jest
      .spyOn(quizRepository, 'find')
      .mockImplementationOnce((quizId: QuizId) => {
        expect(quizId).toMatchObject(givenReply.getQuizId());
        return Promise.resolve(givenQuiz);
      });

    await saveReplyService.run(
      givenReply.getId(),
      givenReply.getQuestionId(),
      givenReply.getAnswerId(),
      givenReply.getQuizId(),
      givenReply.getCorrect(),
    );
  });
});
