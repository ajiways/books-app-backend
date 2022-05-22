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
import { AuthorService } from './services/author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorDto);
  }

  @Get()
  async findAll(@Query('page') page: string) {
    const result = await this.authorService.findAll(+page);

    //FIXME: См. books.api на фронте, оно просто отказывается работать.
    // res.setHeader('X-Total-Count', result.totalCount);

    return {
      totalCount: result.totalCount,
      authors: result.authors,
    };
  }

  @Get('all')
  async findLiterallyAll() {
    return await this.authorService.findLiterallyAll();
  }

  @Get('book/:id')
  async getByBookId(@Param('id') id: string) {
    return await this.authorService.findByBookId(id);
  }

  @Get('books/:id')
  async getAuthorBooks(@Param('id') id: string) {
    return await this.authorService.findBooksByAuthorId(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(id);
  }

  @Patch()
  async update(@Body() updateAuthorDto: UpdateAuthorDto) {
    return await this.authorService.update(updateAuthorDto);
  }

  @Delete()
  async remove(@Body('id') id: string) {
    return await this.authorService.remove(id);
  }
}
