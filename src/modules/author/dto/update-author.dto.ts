import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsString, Length } from 'class-validator';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @IsMongoId()
  id: string;

  @IsString()
  @Length(6, 32)
  firstName: string;

  @IsString()
  @Length(32, 256)
  lastName: string;
}
