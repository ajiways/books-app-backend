import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

export function getOrmConfig(): TypeOrmModuleOptions {
  let entitiesPath = '/dist/**/*.entity.js';

  if (process.env.DOCKER !== 'NO') {
    entitiesPath = '/**/*.entity.js';
  }

  return {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    entities: [join(process.cwd(), entitiesPath)],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
    useUnifiedTopology: true,
  };
}

export const typeormConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
