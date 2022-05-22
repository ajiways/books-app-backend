import { Column, Entity, ManyToOne } from 'typeorm';
import { CreatedEntity } from '../../../common/created.entity';
import { BookEntity } from '../../book/entities/book.entity';
import { AuthorEntity } from './author.entity';

@Entity()
export class AuthorBooksEntity extends CreatedEntity {
  @ManyToOne(() => AuthorEntity, { nullable: false })
  private author: AuthorEntity;

  @Column({ type: String, nullable: false })
  authorId: string;

  @ManyToOne(() => BookEntity, { nullable: false })
  private book: BookEntity;

  @Column({ type: String, nullable: false })
  bookId: string;
}
