import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Type } from '../enum/type.enum';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  credit: number;

  @Column()
  type: Type;

  @Column({ nullable: true, name: 'maintutor' })
  mainTutor: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  static async createUser(
    id: string,
    password: string,
    name: string,
    phone: string,
    credit: number,
    type: Type,
    mainTutor: string,
  ) {
    const user = new Users();
    user.id = id;
    user.password = await bcrypt.hash(password, 10);
    user.name = name;
    user.phone = phone;
    user.credit = credit;
    user.type = type;
    user.mainTutor = mainTutor;

    await user.save();

    return user;
  }

  static async findOneUserById(id: string) {
    return await Users.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select([
        'user.id',
        'user.name',
        'user.phone',
        'user.mainTutor',
        'user.credit',
        'user.type',
        'user.createdAt',
        'user.updatedAt',
        'user.deletedAt',
      ])
      .getOne();
  }

  static async findOneUserWithPWById(id: string) {
    return await Users.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  static async deleteOneUserByUserId(userId: number) {
    return await Users.createQueryBuilder()
      .update(Users)
      .set({ deletedAt: new Date() })
      .where('userId = :userId', { userId })
      .execute();
  }

  static async updateOneUserById(
    id: string,
    credit: number,
    phone: string,
    mainTutor: string,
  ) {
    return await Users.createQueryBuilder()
      .update(Users)
      .set({ credit, phone, mainTutor })
      .where('id = :id', { id })
      .execute();
  }

  static async getAllUsersByPage(page: number) {
    return await Users.createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .take(10)
      .skip((page - 1) * 10)
      .getMany();
  }

  static async getAllMyStudentsByPage(page: number, mainTutor: string) {
    console.log(mainTutor);
    return await Users.createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC')
      .where('mainTutor = :mainTutor', { mainTutor })
      .take(10)
      .skip((page - 1) * 10)
      .getMany();
  }
}