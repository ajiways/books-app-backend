import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  @InjectRepository(BookEntity)
  private readonly bookRepository: MongoRepository<BookEntity>;

  async create(createBookDto: CreateBookDto) {
    return await this.bookRepository.save(createBookDto);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: string) {
    return await this.bookRepository.findOne({ where: { _id: id } });
  }

  async update(updateBookDto: UpdateBookDto) {
    return await this.bookRepository.save(updateBookDto);
  }

  async remove(id: string) {
    return await this.bookRepository.delete({ _id: id });
  }
}
