import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity()
export class ReplyEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 36,
  })
  questionId: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 36,
  })
  answerId: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 36,
  })
  quizId: string;

  @Column('boolean')
  correct: boolean;
}
