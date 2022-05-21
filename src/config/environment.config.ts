import { IsNumber, IsString, validateSync } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { plainToClass, Transform } from 'class-transformer';

type TTransformerValue = { value: string | number };

export class EnvironmentConfig {
  @Transform(({ value }: TTransformerValue) => (value ? +value : 3000))
  @IsNumber()
  APP_PORT: number;

  @IsString()
  MONGO_URL: string;
}

export default registerAs('env', function (): EnvironmentConfig {
  const validatedConfig = plainToClass(EnvironmentConfig, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
});
