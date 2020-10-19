import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAssessmentCommand } from '../../../contexts/back-office/assessment/application/create/create-assessment.command';

@Controller('back-office/assessments')
export class AssessmentPostController {
  constructor(private commandBus: CommandBus) {}

  @Post('/')
  async create(
    @Body() body: { id: string; unitId: number; duration: number },
    @Res() res: any,
  ) {
    await this.commandBus.execute(
      new CreateAssessmentCommand(body.id, body.unitId, body.duration),
    );

    res.status(HttpStatus.CREATED).send();
  }
}
