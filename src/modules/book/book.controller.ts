import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(@Query('page') page: string) {
    const result = await this.bookService.findAll(+page);

    //FIXME: См. books.api на фронте, оно просто отказывается работать.
    // res.setHeader('X-Total-Count', result.totalCount);

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Patch()
  async update(@Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(updateBookDto);
  }

  @Delete()
  async remove(@Body('id') id: string) {
    return await this.bookService.remove(id);
  }
}
