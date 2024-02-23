import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  readonly room: string;

  @IsNumber()
  @IsNotEmpty()
  readonly time: string;

  @IsDate()
  @IsNotEmpty()
  readonly classAt: Date;
}
