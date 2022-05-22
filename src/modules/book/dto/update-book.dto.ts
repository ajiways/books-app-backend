import { IsString, Length } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  id: string;

  @IsString()
  @Length(6, 32)
  title: string;

  @IsString()
  @Length(32, 256)
  description: string;
}
