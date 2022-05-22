import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AuthorBooksService } from '../author/services/author.books.service';
import { AuthorService } from '../author/services/author.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  @InjectRepository(BookEntity)
  private readonly bookRepository: MongoRepository<BookEntity>;

  @Inject(forwardRef(() => AuthorService))
  private readonly authorsService: AuthorService;

  @Inject()
  private readonly authorBooksService: AuthorBooksService;

  async create(createBookDto: CreateBookDto) {
    const authors = await this.authorsService.findByIds(
      createBookDto.authorIds,
    );

    const book = await this.bookRepository.save({
      description: createBookDto.description,
      title: createBookDto.title,
    });

    await this.authorBooksService.saveEntities(
      book._id,
      authors.map((i) => i._id),
    );

    return book;
  }

  async findAll(page: number) {
    const take = 7;
    const skip = page === 1 ? 0 : (page - 1) * take;

    const result = await this.bookRepository.findAndCount({
      take,
      skip,
    });

    return {
      totalCount: result[1],
      books: result[0],
    };
  }

  async findOne(id: string) {
    const candidate = await this.bookRepository.findOne(id);

    if (!candidate) {
      throw new NotFoundException(`Book with id ${id} was not found`);
    }

    return candidate;
  }

  async update(updateBookDto: UpdateBookDto) {
    const candidate = await this.findOne(updateBookDto.id);

    const toSave = this.bookRepository.merge(candidate, {
      description: updateBookDto.description,
      title: updateBookDto.title,
    });

    return await this.bookRepository.save(toSave);
  }

  async remove(id: string) {
    const candidate = await this.bookRepository.findOne(id);

    if (!candidate) {
      throw new NotFoundException(`Book with id ${id} was not found`);
    }

    return await this.bookRepository.remove(candidate);
  }

  async findByIds(ids: string[]) {
    return await this.bookRepository.findByIds(ids);
  }
}
