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
  @PrimaryGeneratedColumn({ name: 'classid' })
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

  static async createClass(tutor: Users, room, time, classAt) {
    const classes = new Classes();
    classes.tutor = tutor;
    classes.room = room;
    classes.time = time;
    classes.classAt = classAt;
    await classes.save();
    return classes;
  }

  static async deleteClass(classId: number) {
    return await Classes.createQueryBuilder()
      .update(Classes)
      .set({ deletedAt: new Date() })
      .where('classId = :classId', { classId })
      .execute();
  }

  static async authClass(classId: number) {
    return await Classes.createQueryBuilder('classes')
      .leftJoinAndSelect('classes.tutor', 'users')
      .where('classId = :classId', { classId })
      .getOne();
  }
}