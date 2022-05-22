import { IsMongoId, IsString, Length } from 'class-validator';

export class UpdateBookDto {
  @IsMongoId()
  id: string;

  @IsString()
  @Length(6, 32)
  title: string;

  @IsString()
  @Length(12, 256)
  description: string;
}
