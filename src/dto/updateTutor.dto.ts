import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTutorDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
