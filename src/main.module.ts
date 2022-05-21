import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigAsync } from './config/typeorm';
import EnvConfig from './config/environment.config';
import { ConfigurationModule } from './configuration/configuration.module';
import { BookModule } from './modules/book/book.module';

const modules = [ConfigurationModule, BookModule];

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({ isGlobal: true, load: [EnvConfig] }),
    TypeOrmModule.forRootAsync(typeormConfigAsync),
  ],
})
export class MainModule {}
