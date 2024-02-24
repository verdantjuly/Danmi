import { IsDate, IsNotEmpty } from 'class-validator';

export class CountClassesDto {
  @IsDate()
  @IsNotEmpty()
  readonly classAt: Date;
}
