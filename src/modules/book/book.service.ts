import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.bookRepository.findOne(id);
  }

  async update(updateBookDto: UpdateBookDto) {
    const candidate = await this.findOne(updateBookDto.id);

    if (!candidate) {
      throw new NotFoundException(
        `Book with id ${updateBookDto.id} was not found`,
      );
    }

    const toSave = this.bookRepository.merge(candidate, {
      description: updateBookDto.description,
      title: updateBookDto.title,
    });

    return await this.bookRepository.save(toSave);
  }

  async remove(id: string) {
    const candidate = await this.findOne(id);

    if (!candidate) {
      throw new NotFoundException(`Book with id ${id} was not found`);
    }

    return await this.bookRepository.remove(candidate);
  }
}
