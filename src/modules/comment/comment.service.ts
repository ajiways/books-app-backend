import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  @InjectRepository(CommentEntity)
  private readonly commentRepository: MongoRepository<CommentEntity>;

  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.save(createCommentDto);
  }

  async getByBookId(bookId: string) {
    return await this.commentRepository.find({
      where: { bookId: bookId.toString() },
    });
  }
}
