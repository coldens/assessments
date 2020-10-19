import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quizzes')
export class QuizEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  assessmentId: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  studentId: string;

  @Column({
    type: 'int',
    unsigned: true,
  })
  attempt: number;

  @Column({
    type: 'int',
    unsigned: true,
  })
  timeLeft: number;

  @Column({
    type: 'varchar',
    length: 36,
  })
  merchantId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
