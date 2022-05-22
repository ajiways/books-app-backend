import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

export function getOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    entities: [join(process.cwd(), '/dist/**/*.entity.js')],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
    useUnifiedTopology: true,
  };
}

export const typeormConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
