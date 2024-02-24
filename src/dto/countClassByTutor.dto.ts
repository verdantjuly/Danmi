import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CountClassesByTutorDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsDate()
  @IsNotEmpty()
  readonly classAt: Date;
}
