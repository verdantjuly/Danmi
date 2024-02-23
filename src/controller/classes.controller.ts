import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from '../service/classes.service';
import { AuthGuard, Roles } from 'src/auth/auth.guard';
import { CreateClassDto } from 'src/dto/createClass.dto';

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
    @Body('room') room: string,
  ) {
    return this.classesService.updateRoom(req, classId, room);
  }
}
