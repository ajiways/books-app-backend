import { IsString, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @Length(3, 32)
  firstName: string;

  @IsString()
  @Length(3, 32)
  lastName: string;
}
