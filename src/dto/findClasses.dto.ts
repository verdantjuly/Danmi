import { IsDate, IsNotEmpty } from 'class-validator';

export class FindClassesDto {
  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;
}
