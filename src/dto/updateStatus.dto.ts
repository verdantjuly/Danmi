import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class UpdateStatusDto {
  @IsEnum(Status)
  @IsNotEmpty()
  readonly status: Status;
}
