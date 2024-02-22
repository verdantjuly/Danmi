import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassesService {
  getHello(): string {
    return 'Hello World!';
  }
}
