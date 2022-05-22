import { IsString, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(6, 32)
  title: string;

  @IsString()
  @Length(32, 256)
  description: string;
}
