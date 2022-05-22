import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigAsync } from './config/typeorm';
import EnvConfig from './config/environment.config';
import { ConfigurationModule } from './configuration/configuration.module';
import { BookModule } from './modules/book/book.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthorModule } from './modules/author/author.module';

const modules = [ConfigurationModule, BookModule, CommentModule];

@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({ isGlobal: true, load: [EnvConfig] }),
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    AuthorModule,
  ],
})
export class MainModule {}
