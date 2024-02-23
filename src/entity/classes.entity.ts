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
  Between,
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

  @Column({ type: 'timestamp' })
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

  static async updateRoom(classId: number, room: string) {
    return await Classes.createQueryBuilder()
      .update(Classes)
      .set({ room })
      .where('classId = :classId', { classId })
      .execute();
  }
  static async updateTutor(classId: number, tutor: Users) {
    return await Classes.createQueryBuilder()
      .update(Classes)
      .set({ tutor })
      .where('classId = :classId', { classId })
      .execute();
  }

  static async updateDateTime(classId: number, classAt: Date, time: number) {
    return await Classes.createQueryBuilder()
      .update(Classes)
      .set({ time, classAt })
      .where('classId = :classId', { classId })
      .execute();
  }

  static async findRangeClasses(startDate: Date, endDate: Date) {
    return await Classes.find({
      where: { classAt: Between(startDate, endDate) },
    });
  }
}
