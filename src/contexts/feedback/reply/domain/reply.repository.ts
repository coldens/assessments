import { ReplyId } from '../../../shared/domain/value-object/identifier/reply-id';
import { Reply } from './reply';
import { ReplyCriteria } from './ReplyCriteria';

export interface ReplyRepository {
  save(reply: Reply): Promise<void>;
  find(id: ReplyId): Promise<Reply | null>;
  findByCriteria(criteria: ReplyCriteria): Promise<Reply[]>;
}
