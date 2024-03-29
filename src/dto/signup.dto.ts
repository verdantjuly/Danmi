import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from '../enum/type.enum';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsNumber()
  @IsOptional()
  readonly credit: number;

  @IsNumber()
  @IsOptional()
  readonly privateCredit: number;

  @IsString()
  @IsOptional()
  readonly mainTutor: string;

  @IsEnum(Type)
  @IsNotEmpty()
  readonly type: Type;
}
