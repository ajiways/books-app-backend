import { Column, Entity, ManyToOne } from 'typeorm';
import { CreatedEntity } from '../../../common/created.entity';
import { BookEntity } from '../../book/entities/book.entity';

@Entity()
export class CommentEntity extends CreatedEntity {
  @Column({ type: String, nullable: false })
  author: string;

  @Column({ type: String, nullable: false })
  content: string;

  @ManyToOne(() => BookEntity, { nullable: false, onDelete: 'CASCADE' })
  private book: BookEntity;

  @Column({ type: String, nullable: false })
  bookId: string;
}
