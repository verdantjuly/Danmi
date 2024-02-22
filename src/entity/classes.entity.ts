import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Users } from './users.entity';
import { Credits } from './credits.entity';

@Entity()
export class Classes extends BaseEntity {
  @PrimaryGeneratedColumn()
  classId: number;

  @ManyToOne(() => Users, (users) => users.classes)
  tutor: Users;

  @Column()
  room: string;

  @Column()
  time: number;

  @Column()
  classAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Credits, (credits) => credits.class)
  credits: Credits[];
}
