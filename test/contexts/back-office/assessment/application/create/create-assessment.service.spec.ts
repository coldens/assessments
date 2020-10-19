import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAssessmentCommand } from '../../../../../../src/contexts/back-office/assessment/application/create/create-assessment.command';
import { CreateAssessmentHandler } from '../../../../../../src/contexts/back-office/assessment/application/create/create-assessment.handler';
import { CreateAssessmentService } from '../../../../../../src/contexts/back-office/assessment/application/create/create-assessment.service';
import { AssessmentRepository } from '../../../../../../src/contexts/back-office/assessment/domain/assessment.repository';
import { AssessmentMother } from '../../domain/AssessmentMother';

describe('CreateAssessmentService', () => {
  let createAssessmentHandler: CreateAssessmentHandler;
  let assessmentRepository: AssessmentRepository;
  let eventBus: EventBus;

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
        {
          provide: EventBus,
          useFactory: () => ({
            publishAll: jest.fn(),
          }),
        },
        CreateAssessmentService,
        CreateAssessmentHandler,
      ],
    }).compile();

    createAssessmentHandler = module.get<CreateAssessmentHandler>(
      CreateAssessmentHandler,
    );
    assessmentRepository = module.get<AssessmentRepository>(
      'ASSESSMENT_REPOSITORY',
    );
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should be defined', () => {
    expect(createAssessmentHandler).toBeDefined();
    expect(assessmentRepository).toBeDefined();
    expect(eventBus).toBeDefined();
  });

  it('should be assessment created', async () => {
    const givenAssessment = AssessmentMother.random();

    await createAssessmentHandler.execute(
      new CreateAssessmentCommand(
        givenAssessment.getId().value,
        givenAssessment.getUnitId().value,
        givenAssessment.getDuration().value,
      ),
    );

    expect(assessmentRepository.save).toBeCalledWith(
      expect.objectContaining({
        id: givenAssessment.getId(),
        unitId: givenAssessment.getUnitId(),
        duration: givenAssessment.getDuration(),
      }),
    );

    expect(eventBus.publishAll).toBeCalledTimes(1);
  });
});
