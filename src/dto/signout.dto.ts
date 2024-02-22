import { IsNotEmpty, IsString } from 'class-validator';

export class SignoutDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
