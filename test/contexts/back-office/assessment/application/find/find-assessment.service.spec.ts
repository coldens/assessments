import { Test, TestingModule } from '@nestjs/testing';
import { FindAssessmentHandler } from '../../../../../../src/contexts/back-office/assessment/application/find/find-assessment.handler';
import { FindAssessmentQuery } from '../../../../../../src/contexts/back-office/assessment/application/find/find-assessment.query';
import { FindAssessmentService } from '../../../../../../src/contexts/back-office/assessment/application/find/find-assessment.service';
import { AssessmentRepository } from '../../../../../../src/contexts/back-office/assessment/domain/assessment.repository';
import { AssessmentMother } from '../../domain/AssessmentMother';

describe('FindAssessmentService', () => {
  let service: FindAssessmentService;
  let queryHandler: FindAssessmentHandler;
  let assessmentRepository: AssessmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ASSESSMENT_REPOSITORY',
          useFactory: () => ({
            save: jest.fn(),
            find: jest.fn(),
          }),
        },
        FindAssessmentService,
        FindAssessmentHandler,
      ],
    }).compile();

    service = module.get<FindAssessmentService>(FindAssessmentService);
    queryHandler = module.get<FindAssessmentHandler>(FindAssessmentHandler);
    assessmentRepository = module.get<AssessmentRepository>(
      'ASSESSMENT_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryHandler).toBeDefined();
  });

  it('should be assessment found', async () => {
    const givenAssessment = AssessmentMother.random();

    jest
      .spyOn(assessmentRepository, 'find')
      .mockImplementationOnce(() => Promise.resolve(givenAssessment));

    const result = await queryHandler.execute(
      new FindAssessmentQuery(givenAssessment.getId().value),
    );

    expect(assessmentRepository.find).toBeCalledWith(
      expect.objectContaining(givenAssessment.getId()),
    );

    expect(result).toMatchObject(givenAssessment.toPrimitives());
  });
});
