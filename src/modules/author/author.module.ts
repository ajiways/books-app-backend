import { forwardRef, Module } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AuthorBooksEntity } from './entities/author.books.entity';
import { AuthorBooksService } from './services/author.books.service';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, AuthorBooksEntity]),
    forwardRef(() => BookModule),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorBooksService],
  exports: [AuthorService, AuthorBooksService],
})
export class AuthorModule {}
