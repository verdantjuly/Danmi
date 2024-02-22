import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Classes } from './classes.entity';
import { Status } from 'src/enum/status.enum';

@Entity()
export class Credits extends BaseEntity {
  @PrimaryGeneratedColumn()
  creditId: number;

  @ManyToOne(() => Users, (users) => users.credits)
  user: Users;

  @ManyToOne(() => Classes, (classes) => classes.credits)
  class: Classes;

  @Column()
  status: Status;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
