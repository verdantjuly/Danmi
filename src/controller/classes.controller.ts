import { Controller, Get } from '@nestjs/common';
import { ClassesService } from '../service/classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  getHello(): string {
    return this.classesService.getHello();
  }
}
