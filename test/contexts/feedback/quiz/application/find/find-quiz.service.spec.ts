import { Test, TestingModule } from '@nestjs/testing';
import { FindQuizService } from '../../../../../../src/contexts/feedback/quiz/application/find/find-quiz.service';
import { QuizRepository } from '../../../../../../src/contexts/feedback/quiz/domain/quiz.repository';
import { QuizMother } from '../../domain/quiz.mother';

describe('FindQuizService', () => {
  let findQuizService: FindQuizService;
  let quizRepository: QuizRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'QUIZ_REPOSITORY',
          useFactory: () => ({
            find: jest.fn(),
          }),
        },
        FindQuizService,
      ],
    }).compile();

    findQuizService = module.get<FindQuizService>(FindQuizService);
    quizRepository = module.get<QuizRepository>('QUIZ_REPOSITORY');
  });

  it('should be defined', () => {
    expect(findQuizService).toBeDefined();
  });

  it('should be quiz found', async () => {
    const givenQuiz = QuizMother.random();

    jest
      .spyOn(quizRepository, 'find')
      .mockImplementationOnce(() => Promise.resolve(givenQuiz));

    const result = await findQuizService.run(givenQuiz.getId());

    expect(result.toPrimitives()).toMatchObject(givenQuiz.toPrimitives());
  });
});
