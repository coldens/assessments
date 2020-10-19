import { Test, TestingModule } from '@nestjs/testing';
import { FindAllService } from '../../../../../../src/contexts/back-office/assessment/application/find-all/find-all.service';
import { Assessment } from '../../../../../../src/contexts/back-office/assessment/domain/assessment';
import { AssessmentRepository } from '../../../../../../src/contexts/back-office/assessment/domain/assessment.repository';

describe('FindAllService', () => {
  let findAllService: FindAllService;
  let assessmentRepository: AssessmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: 'ASSESSMENT_REPOSITORY',
          useFactory: () => ({ findAll: jest.fn() }),
        },
        FindAllService,
      ],
    }).compile();

    findAllService = module.get<FindAllService>(FindAllService);
    assessmentRepository = module.get<AssessmentRepository>(
      'ASSESSMENT_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(findAllService).toBeDefined();
    expect(assessmentRepository).toBeDefined();
  });

  it('should be found all assessments', async () => {
    const givenPrimitiveAssessments = [
      {
        id: '4a50f234-576c-416f-8575-4151490221ef',
        unitId: 30,
        duration: 30,
      },
      {
        id: 'c61b5e86-a1c0-4cf7-bc87-eb9a82a7470a',
        unitId: 30,
        duration: 30,
      },
    ];

    jest.spyOn(assessmentRepository, 'findAll').mockImplementationOnce(() => {
      return Promise.resolve(
        givenPrimitiveAssessments.map((p) =>
          Assessment.fromPrimitives(p.id, p.unitId, p.duration),
        ),
      );
    });

    const result = await findAllService.run();

    expect(result.map((a) => a.toPrimitives())).toMatchObject(
      givenPrimitiveAssessments,
    );
  });
});
