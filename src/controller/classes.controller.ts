import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from '../service/classes.service';
import { AuthGuard, Roles } from 'src/auth/auth.guard';
import { CreateClassDto } from 'src/dto/createClass.dto';
import { UpdateTutorDto } from 'src/dto/updateTutor.dto';
import { UpdateRoomDto } from 'src/dto/updateRoom.dto';
import { UpdateDateTimeDto } from 'src/dto/updateDateTime.dto';
import { FindClassesDto } from 'src/dto/findClasses.dto';
import { CountClassesByTutorDto } from 'src/dto/countClassByTutor.dto';
import { CountClassesDto } from 'src/dto/countClass.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  createClass(@Req() req, @Body() createClassDto: CreateClassDto) {
    return this.classesService.createClass(req, createClassDto);
  }

  @Delete(':classId')
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  deleteClass(@Req() req, @Param('classId') classId: number) {
    return this.classesService.deleteClass(req, classId);
  }

  @Patch('room/:classId')
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  updateRoom(
    @Req() req,
    @Param('classId') classId: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.classesService.updateRoom(req, classId, updateRoomDto);
  }

  @Patch('tutor/:classId')
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  updateTutor(
    @Req() req,
    @Param('classId') classId: number,
    @Body() updateTutorDto: UpdateTutorDto,
  ) {
    return this.classesService.updateTutor(req, classId, updateTutorDto);
  }

  @Patch('datetime/:classId')
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  updateDateTime(
    @Req() req,
    @Param('classId') classId: number,
    @Body() updateDateTimeDto: UpdateDateTimeDto,
  ) {
    return this.classesService.updateDateTime(req, classId, updateDateTimeDto);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Roles('tutor', 'admin')
  findClasses(@Body() findClassesDto: FindClassesDto) {
    return this.classesService.findClasses(findClassesDto);
  }

  @Get('count')
  @UseGuards(AuthGuard)
  @Roles('admin')
  countClasses(@Body() countClassesDto: CountClassesDto) {
    return this.classesService.countClasses(countClassesDto);
  }
  @Get('count/tutor')
  @UseGuards(AuthGuard)
  @Roles('admin')
  countClassesByTutor(@Body() countClassesByTutorDto: CountClassesByTutorDto) {
    return this.classesService.countClassesByTutor(countClassesByTutorDto);
  }
}
