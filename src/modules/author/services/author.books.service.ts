import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongoose';
import { MongoRepository } from 'typeorm';
import { AuthorBooksEntity } from '../entities/author.books.entity';

@Injectable()
export class AuthorBooksService {
  @InjectRepository(AuthorBooksEntity)
  private readonly authorBooksRepository: MongoRepository<AuthorBooksEntity>;

  async findByAuthorId(id: string) {
    return await this.authorBooksRepository.find({
      where: { authorId: id },
    });
  }

  async findByBookId(id: string) {
    return await this.authorBooksRepository.find({
      where: { bookId: id },
    });
  }

  async saveEntity(bookId: string, authorId: string) {
    return await this.authorBooksRepository.save({ authorId, bookId });
  }

  async saveEntities(bookId: ObjectId, authorIds: ObjectId[]) {
    const toSave = authorIds.map((id) => {
      return {
        bookId: bookId.toString(),
        authorId: id.toString(),
      };
    });

    return await this.authorBooksRepository.save(toSave);
  }
}
