import { Column, Entity } from 'typeorm';
import { CreatedEntity } from '../../../common/created.entity';

@Entity()
export class BookEntity extends CreatedEntity {
  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: String, nullable: false })
  description: string;
}
