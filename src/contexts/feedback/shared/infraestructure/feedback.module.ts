import { Module } from '@nestjs/common';
import { ReplyModule } from '../../reply/infraestructure/reply.module';

@Module({
  imports: [ReplyModule],
})
export class FeedbackModule {}
