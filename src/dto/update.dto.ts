import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly mainTutor: string;

  @IsNumber()
  @IsOptional()
  readonly credit: number;
}
