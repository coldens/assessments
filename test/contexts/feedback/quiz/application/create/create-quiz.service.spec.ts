import { EventBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuizCommand } from '../../../../../../src/contexts/feedback/quiz/application/create/create-quiz.command';
import { CreateQuizHandler } from '../../../../../../src/contexts/feedback/quiz/application/create/create-quiz.handler';
import { CreateQuizService } from '../../../../../../src/contexts/feedback/quiz/application/create/create-quiz.service';
import { AssessmentNotExists } from '../../../../../../src/contexts/feedback/quiz/domain/assessment-not-exists';
import { QuizRepository } from '../../../../../../src/contexts/feedback/quiz/domain/quiz.repository';
import { QuizMother } from '../../domain/quiz.mother';

describe('CreateQuizService', () => {
  let service: CreateQuizService;
  let queryBus: QueryBus;
  let createQuizHandler: CreateQuizHandler;
  let eventBus: EventBus;
  let repository: QuizRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'QUIZ_REPOSITORY',
          useFactory: () => ({
            save: jest.fn(),
            findByCriteria: jest.fn(),
          }),
        },
        {
          provide: QueryBus,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: EventBus,
          useFactory: () => ({
            publishAll: jest.fn(),
          }),
        },
        CreateQuizService,
        CreateQuizHandler,
      ],
    }).compile();

    service = module.get<CreateQuizService>(CreateQuizService);
    createQuizHandler = module.get<CreateQuizHandler>(CreateQuizHandler);
    queryBus = module.get<QueryBus>(QueryBus);
    eventBus = module.get<EventBus>(EventBus);
    repository = module.get<QuizRepository>('QUIZ_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(createQuizHandler).toBeDefined();
  });

  it('should be quiz created', async () => {
    const givenDuration = 30;
    const givenQuiz = QuizMother.random({ quizTimeLeft: givenDuration });

    jest.spyOn(repository, 'save').mockResolvedValueOnce();
    jest.spyOn(repository, 'findByCriteria').mockResolvedValueOnce(null);
    jest.spyOn(eventBus, 'publishAll').mockResolvedValueOnce(null);

    jest
      .spyOn(queryBus, 'execute')
      .mockResolvedValueOnce({ duration: givenQuiz.getTimeLeft().value });

    await createQuizHandler.execute(
      new CreateQuizCommand(
        givenQuiz.getId().value,
        givenQuiz.getAssessmentId().value,
        givenQuiz.getStudentId().value,
        givenQuiz.getAttempt().value,
        givenQuiz.getMerchantId().value,
      ),
    );
  });

  it('should be assessment not exists', () => {
    const givenQuiz = QuizMother.random();

    jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(null);
    jest.spyOn(eventBus, 'publishAll').mockResolvedValueOnce(null);
    jest.spyOn(repository, 'findByCriteria').mockResolvedValueOnce(null);

    expect(() =>
      service.run(
        givenQuiz.getId(),
        givenQuiz.getAssessmentId(),
        givenQuiz.getStudentId(),
        givenQuiz.getAttempt(),
        givenQuiz.getMerchantId(),
      ),
    ).rejects.toThrow(AssessmentNotExists);
  });
});
