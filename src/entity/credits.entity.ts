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

  static async createCredit(user: Users, classes: Classes, status: Status) {
    const credit = new Credits();
    credit.user = user;
    credit.class = classes;
    credit.status = status;
    const result = await credit.save();
    delete result.user.password;
    return result;
  }

  static async endCredits(classAt: Date) {
    const result = await Credits.createQueryBuilder('credits')
      .leftJoinAndSelect('credits.class', 'classes')
      .leftJoin('credits.user', 'users')
      .where(
        'classes.classAt = :classAt AND users.credit = :value AND users.privateCredit = :value',
        {
          classAt,
          value: 0,
        },
      )
      .getMany();

    return result.map((data) => data.user.id);
  }
  static async countCredit(classId: number) {
    return Credits.createQueryBuilder('credits')
      .leftJoinAndSelect('credits.class', 'classes')
      .where('classes.classId = :classId', { classId })
      .getCount();
  }
  static async isCredit(classId: number, id: string) {
    return Credits.createQueryBuilder('credits')
      .leftJoinAndSelect('credits.class', 'classes')
      .leftJoinAndSelect('credits.user', 'users')
      .where('classes.classId = :classId AND users.id = :id', { classId, id })
      .getOne();
  }
  static async findCredit(id: string, date: Date) {
    return await Credits.createQueryBuilder('credits')
      .leftJoin('credits.user', 'users')
      .leftJoinAndSelect('credits.class', 'classes')
      .where('classes.classAt = :date AND users.id = :id', { date, id })
      .getMany();
  }
  static async updateStatus(creditId: number, status: Status) {
    return await Credits.createQueryBuilder()
      .update(Credits)
      .set({ status })
      .where('creditId = :creditId', { creditId })
      .execute();
  }
}
