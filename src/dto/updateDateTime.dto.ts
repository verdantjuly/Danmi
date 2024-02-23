import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDateTimeDto {
  @IsNumber()
  @IsNotEmpty()
  readonly time: number;

  @IsDate()
  @IsNotEmpty()
  readonly classAt: Date;
}
