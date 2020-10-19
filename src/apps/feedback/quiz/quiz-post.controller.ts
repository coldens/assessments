import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('feedback/quiz')
export class QuizPostController {
  constructor(private commandBus: CommandBus) {}
  @Post('/')
  create(@Body() body: any) {}
}
