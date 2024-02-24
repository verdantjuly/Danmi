import { IsDate, IsNotEmpty } from 'class-validator';

export class FindCreditDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
}
