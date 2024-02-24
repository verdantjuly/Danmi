import { IsDate, IsNotEmpty } from 'class-validator';

export class EndCreditsDto {
  @IsDate()
  @IsNotEmpty()
  readonly classAt: Date;
}
