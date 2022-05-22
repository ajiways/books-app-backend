import { Column, Entity } from 'typeorm';
import { CreatedEntity } from '../../../common/created.entity';

@Entity()
export class AuthorEntity extends CreatedEntity {
  @Column({ type: String, nullable: false })
  firstName: string;

  @Column({ type: String, nullable: false })
  lastName: string;
}
