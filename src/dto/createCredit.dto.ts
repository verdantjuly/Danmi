import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreateCreditDto {
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number;

  @IsNotEmpty()
  @IsEnum(Status)
  readonly status: Status;
}
