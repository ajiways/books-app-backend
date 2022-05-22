import { ArrayMinSize, IsArray, IsString, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(6, 32)
  title: string;

  @IsString()
  @Length(12, 256)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  authorIds: string[];
}
