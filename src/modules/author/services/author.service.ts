import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Types } from 'mongoose';
import { MongoRepository } from 'typeorm';
import { BookService } from '../../book/book.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorBooksService } from './author.books.service';

@Injectable()
export class AuthorService {
  @InjectRepository(AuthorEntity)
  private readonly authorRepository: MongoRepository<AuthorEntity>;

  @Inject()
  private readonly authorBooksService: AuthorBooksService;

  @Inject(forwardRef(() => BookService))
  private readonly booksService: BookService;

  async create(createAuthorEntity: CreateAuthorDto) {
    return await this.authorRepository.save(createAuthorEntity);
  }

  async findAll(page: number) {
    const take = 7;
    const skip = page === 1 ? 0 : (page - 1) * take;

    const result = await this.authorRepository.findAndCount({
      take,
      skip,
    });

    return {
      totalCount: result[1],
      authors: result[0],
    };
  }

  async findOne(id: string) {
    const candidate = await this.authorRepository.findOne({
      where: { _id: new Types.ObjectId(id) },
    });

    if (!candidate) {
      throw new NotFoundException(`Author with id ${id} was not found`);
    }

    return candidate;
  }

  async update(updateAuthorDto: UpdateAuthorDto) {
    const candidate = await this.findOne(updateAuthorDto.id);

    const toSave = this.authorRepository.merge(candidate, {
      firstName: updateAuthorDto.firstName,
      lastName: updateAuthorDto.lastName,
    });

    return await this.authorRepository.save(toSave);
  }

  async remove(id: string) {
    const candidate = await this.authorRepository.findOne(id);

    if (!candidate) {
      throw new NotFoundException(`Author with id ${id} was not found`);
    }

    return await this.authorRepository.remove(candidate);
  }

  async findByBookId(id: string): Promise<AuthorEntity[]> {
    const authorBooks = await this.authorBooksService.findByBookId(id);

    const ids = authorBooks.map(
      (i) => new Types.ObjectId(i.authorId.toString()),
    );

    const authors = await this.authorRepository.find({
      where: {
        _id: {
          $in: ids,
        },
      },
    });

    return authors;
  }

  async findBooksByAuthorId(id: string) {
    const authorBooks = await this.authorBooksService.findByAuthorId(id);

    const books = await this.booksService.findByIds(
      authorBooks.map((i) => i.bookId),
    );

    return books;
  }

  async findByIds(authorIds: string[]): Promise<AuthorEntity[]> {
    return await this.authorRepository.findByIds(authorIds);
  }

  async findLiterallyAll() {
    return await this.authorRepository.find();
  }
}
