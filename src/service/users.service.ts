import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Req,
} from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { Users } from 'src/entity/users.entity';
import { LoginDto } from 'src/dto/login.dto';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SignoutDto } from 'src/dto/signout.dto';
import { UpdateDto } from 'src/dto/update.dto';

@Injectable()
export class UsersService {
  async signup(signupDto: SignupDto): Promise<Users> {
    const isExist = await Users.findOneUserById(signupDto.id);
    if (isExist) {
      throw new ConflictException('Member already Exists');
    }
    const user = await Users.createUser(
      signupDto.id,
      signupDto.password,
      signupDto.name,
      signupDto.phone,
      signupDto.credit,
      signupDto.type,
      signupDto.mainTutor,
    );
    delete user.password;
    return user;
  }
  async login(@Req() req, loginDto: LoginDto): Promise<string> {
    const user = await Users.findOneUserWithPWById(loginDto.id);
    if (user) {
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (passwordMatch) {
        delete user.password;
        let sessionId = uuidv4();
        for (let i = 1; i > 0; i++) {
          if (req.session[sessionId]) {
            sessionId = uuidv4();
          } else {
            req.session[sessionId] = user;
            return sessionId;
          }
        }
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new BadRequestException();
    }
  }
  async signout(@Req() req, signoutDto: SignoutDto): Promise<string> {
    const sessionData = await req.session[req.headers.authorization];
    if (sessionData.id == signoutDto.id) {
      const user = await Users.findOneUserWithPWById(signoutDto.id);
      const passwordMatch = await bcrypt.compare(
        signoutDto.password,
        user.password,
      );
      if (passwordMatch) {
        await Users.deleteOneUserByUserId(user.userId);
        return 'Account Deleted';
      }
    } else {
      throw new BadRequestException();
    }
  }
  async update(@Req() req, updateDto: UpdateDto): Promise<string> {
    const sessionData = await req.session[req.headers.authorization];
    if (!sessionData) {
      throw new BadRequestException();
    }
    const user = await Users.findOneUserById(updateDto.id);
    if (sessionData.type == 'tutor') {
      console.log(user.mainTutor);
      console.log(sessionData.name);
      if (user.mainTutor == sessionData.name) {
        const result = await Users.updateOneUserById(
          user.id,
          updateDto.privateCredit,
          updateDto.credit,
          updateDto.phone,
          updateDto.mainTutor,
        );
        if (result.affected > 0) return 'User Updated Successfully';
      } else {
        throw new ForbiddenException();
      }
    } else if (sessionData.type == 'admin') {
      const result = await Users.updateOneUserById(
        user.id,
        updateDto.privateCredit,
        updateDto.credit,
        updateDto.phone,
        updateDto.mainTutor,
      );
      if (result.affected > 0) return 'User Updated Successfully';
    }
  }
  async logout(@Req() req) {
    delete req.session[req.headers.authorization];
    return 'Successfully Logged Out';
  }
  async listMember(page: number) {
    const list = await Users.getAllUsersByPage(page);
    return list.map((user) => {
      delete user.password;
      return user;
    });
  }
  async listMyStudents(page: number, mainTutor: string) {
    const list = await Users.getAllMyStudentsByPage(page, mainTutor);
    return list.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOneMember(id: string) {
    return await Users.findOneUserById(id);
  }
}
