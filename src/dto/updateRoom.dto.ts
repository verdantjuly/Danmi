import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  @IsNotEmpty()
  readonly room: string;
}
