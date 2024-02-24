import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Req,
} from '@nestjs/common';
import { CountClassesDto } from 'src/dto/countClass.dto';
import { CountClassesByTutorDto } from 'src/dto/countClassByTutor.dto';
import { CreateClassDto } from 'src/dto/createClass.dto';
import { FindClassesDto } from 'src/dto/findClasses.dto';
import { UpdateDateTimeDto } from 'src/dto/updateDateTime.dto';
import { UpdateRoomDto } from 'src/dto/updateRoom.dto';
import { UpdateTutorDto } from 'src/dto/updateTutor.dto';
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

    if (classes.tutor.id == sessionData.id || sessionData.type == 'admin') {
      const result = await Classes.deleteClass(classId);
      if (result.affected > 0) {
        return 'Class Deleted';
      }
    } else throw new ForbiddenException();
  }

  async updateRoom(@Req() req, classId: number, updateRoomDto: UpdateRoomDto) {
    const sessionData = await req.session[req.headers.authorization];
    const classes = await Classes.authClass(classId);

    if (classes.tutor.id == sessionData.id || sessionData.type == 'admin') {
      const result = await Classes.updateRoom(classId, updateRoomDto.room);
      if (result.affected > 0) {
        return 'Class Room Updated';
      }
    } else throw new ForbiddenException();
  }

  async updateTutor(
    @Req() req,
    classId: number,
    updateTutorDto: UpdateTutorDto,
  ) {
    const sessionData = await req.session[req.headers.authorization];
    const classes = await Classes.authClass(classId);
    const tutor = await Users.findOneUserWithPWById(updateTutorDto.id);
    if (!tutor) {
      throw new BadRequestException();
    }
    if (classes.tutor.id == sessionData.id || sessionData.type == 'admin') {
      const result = await Classes.updateTutor(classId, tutor);
      if (result.affected > 0) {
        return 'Class Tutor Updated';
      }
    } else throw new ForbiddenException();
  }

  async updateDateTime(
    @Req() req,
    classId: number,
    updateDateTimeDto: UpdateDateTimeDto,
  ) {
    const sessionData = await req.session[req.headers.authorization];
    const classes = await Classes.authClass(classId);

    if (classes.tutor.id == sessionData.id || sessionData.type == 'admin') {
      const result = await Classes.updateDateTime(
        classId,
        updateDateTimeDto.classAt,
        updateDateTimeDto.time,
      );

      if (result.affected > 0) {
        return 'Class Date Time Updated';
      }
    } else throw new ForbiddenException();
  }
  async findClasses(findClassesDto: FindClassesDto) {
    return await Classes.findClasses(
      findClassesDto.startDate,
      findClassesDto.endDate,
    );
  }
  async countClasses(countClassesDto: CountClassesDto) {
    return await Classes.countClasses(countClassesDto.classAt);
  }
  async countClassesByTutor(countClassesByTutorDto: CountClassesByTutorDto) {
    const tutor = await Users.findOneUserWithPWById(countClassesByTutorDto.id);
    return await Classes.countClassesByTutor(
      countClassesByTutorDto.classAt,
      tutor.userId,
    );
  }
}
