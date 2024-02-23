import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;
}
