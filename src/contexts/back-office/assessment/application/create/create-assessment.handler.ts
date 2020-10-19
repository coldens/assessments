import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAssessmentCommand } from './create-assessment.command';
import { AssessmentId } from '../../../../shared/domain/value-object/identifier/assessment-id';
import { UnitId } from '../../../../shared/domain/value-object/identifier/unit-id';
import { AssessmentDuration } from '../../domain/assessment-duration';
import { CreateAssessmentService } from './create-assessment.service';

@CommandHandler(CreateAssessmentCommand)
export class CreateAssessmentHandler {
  constructor(private app: CreateAssessmentService) {}

  async execute(command: CreateAssessmentCommand) {
    return this.app.run(
      new AssessmentId(command.id),
      new UnitId(command.unitId),
      new AssessmentDuration(command.duration),
    );
  }
}
