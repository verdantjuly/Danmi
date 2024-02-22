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

  @Column({ nullable: true })
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
    return await Users.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'phone',
        'mainTutor',
        'credit',
        'type',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  }
  static async findOneUserWithPWById(id: string) {
    return await Users.findOne({
      where: { id },
    });
  }
  static async DeleteOneUserByUserId(userId: number) {
    return await Users.update({ userId }, { deletedAt: new Date() });
  }
  static async UpdateOneUserByUserId(
    userId: number,
    credit: number,
    phone: string,
    mainTutor: string,
  ) {
    return await Users.update(userId, { credit, phone, mainTutor });
  }
  static async GetAllUsersByPage(page: number) {
    return await Users.find({
      order: { createdAt: 'DESC' },
      take: 10,
      skip: (page - 1) * 10,
    });
  }
}
