import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { CreateClassDto } from 'src/dto/createClass.dto';
import { Classes } from 'src/entity/classes.entity';
import { Users } from 'src/entity/users.entity';

@Injectable()
export class ClassesService {
  async createClass(@Req() req, createClassDto: CreateClassDto) {
    const sessionData = await req.session[req.headers.authorization];
    const tutor = await Users.findOneUserWithPWById(sessionData.id);
    const result = await Classes.createClass(
      tutor,
      createClassDto.room,
      createClassDto.time,
      createClassDto.classAt,
    );
    if (result) {
      return 'Class Created';
    }
  }

  async deleteClass(@Req() req, classId: number) {
    const sessionData = await req.session[req.headers.authorization];
    const classes = await Classes.authClass(classId);
    console.log(classes);
    if (classes.tutor.id == sessionData.id) {
      const result = await Classes.deleteClass(classId);
      if (result.affected > 0) {
        return 'Class Deleted';
      }
    } else throw new ForbiddenException();
  }
}
